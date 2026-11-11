#!/usr/bin/env python3
"""補齊官方 TFDA CSV 樣品；原有檔案以 sampleId 去重且不覆寫。
用法：python tools/import-tfda.py /path/to/20_2.csv --archive /path/to/official.zip
完成後執行 node tools/build-index.mjs 與 node tools/validate-tfda.mjs。
"""
import argparse, collections, csv, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE_SET = 'tfda-complete-2026-11'
DATASET_URL = 'https://data.gov.tw/dataset/8543'
DOWNLOAD_URL = 'https://data.fda.gov.tw/data/opendata/export/20/csv'
ACCESSED = '2026-11-11'
# 每 100 克欄位原單位；ug 在介面定義為微克，不與 mg 混用。
FIELD_MAP = {
 'kcal': ('熱量','kcal'), 'protein': ('粗蛋白','g'), 'fat': ('粗脂肪','g'),
 'satFat': ('飽和脂肪','g'), 'carbs': ('總碳水化合物','g'), 'sugar': ('糖質總量','g'),
 'fiber': ('膳食纖維','g'), 'sodium': ('鈉','mg'), 'potassium': ('鉀','mg'),
 'calcium': ('鈣','mg'), 'iron': ('鐵','mg'), 'vitC': ('維生素C','mg'),
 'cholesterol': ('膽固醇','mg'), 'zinc': ('鋅','mg'), 'vitB1': ('維生素B1','mg'),
 'vitB2': ('維生素B2','mg'), 'vitB6': ('維生素B6','mg'), 'vitB12': ('維生素B12','ug'),
 'vitD': ('維生素D總量(ug)','ug'), 'epa': ('廿碳五烯酸(20:5)','mg'), 'dha': ('廿二碳六烯酸(22:6)','mg')
}
CATEGORY = {
 '魚貝類': ('豆魚蛋肉','🐟'), '肉類': ('豆魚蛋肉','🥩'), '蛋類': ('豆魚蛋肉','🥚'),
 '豆類': ('豆魚蛋肉','🫘'), '加工調理食品及其他類': ('加工調理食品','🍱'),
 '蔬菜類': ('蔬菜','🥬'), '菇類': ('蔬菜','🍄'), '藻類': ('蔬菜','🌿'),
 '水果類': ('水果','🍎'), '調味料及香辛料類': ('香料調味','🧂'),
 '糕餅點心類': ('點心零食','🍰'), '穀物類': ('全穀雜糧','🌾'),
 '乳品類': ('乳品','🥛'), '飲料類': ('飲品','🥤'), '澱粉類': ('全穀雜糧','🍚'),
 '油脂類': ('油脂','🫒'), '堅果及種子類': ('堅果種子','🥜'), '糖類': ('糖類','🍬')
}

def write_json(p, data, compact=False):
 p.parent.mkdir(parents=True, exist_ok=True)
 p.write_text(json.dumps(data, ensure_ascii=False, indent=None if compact else 2,
                         separators=(',', ':') if compact else None) + '\n', encoding='utf-8')

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('csv_path', type=pathlib.Path)
 parser.add_argument('--archive', type=pathlib.Path, required=True)
 args=parser.parse_args()
 csv_bytes=args.csv_path.read_bytes()
 samples=collections.defaultdict(list)
 field_definitions={}
 with args.csv_path.open(encoding='utf-8-sig', newline='') as f:
  for row in csv.DictReader(f):
   code=row['整合編號'].strip()
   assert code and row['樣品名稱']
   samples[code].append(row)
   key=row['分析項'];definition={'name':key,'unit':row['含量單位'],'group':row['分析項分類']}
   assert key not in field_definitions or field_definitions[key]==definition
   field_definitions[key]=definition
 assert len(field_definitions)==104
 fields=[field_definitions[key] for key in sorted(field_definitions)]
 field_index={f['name']:i for i,f in enumerate(fields)}
 keys=[n['key'] for n in json.loads((ROOT/'foods/nutrients.json').read_text())]
 assert set(keys)<=set(FIELD_MAP), '新增營養素尚未定義 TFDA 對應欄位'
 coverage={};existing_names=set();existing_ids=set()
 items_dir=ROOT/'foods/items'
 for path in sorted(items_dir.glob('*.json')):
  food=json.loads(path.read_text());existing_names.add(food['name']);existing_ids.add(food['id'])
  for source in food.get('sources',[]):
   code=source.get('sampleId')
   if not code:continue
   assert code not in coverage, '同一官方 sampleId 已有多個檔案：'+code
   coverage[code]=path.name
 groups=collections.defaultdict(list);created=0
 for code, rows in sorted(samples.items()):
  assert len(rows)==104 and len({r['分析項'] for r in rows})==104, code
  raw=rows[0];nutrients={r['分析項']:r for r in rows};source_category=raw['食品分類']
  assert source_category in CATEGORY
  values=[nutrients[field['name']]['每100克含量'].strip() for field in fields]
  record={'sampleId':code,'name':raw['樣品名稱'],'aliases':raw['俗名'],
    'englishName':raw['樣品英文名稱'],'description':raw['內容物描述'],
    'sourceCategory':source_category,'dataType':raw['資料類別'],
    'discardRate':raw['廢棄率'],'values':values}
  groups[source_category].append(record)
  if code in coverage:continue
  id='tfda-'+code.lower();filename=id+'.json'
  assert id not in existing_ids and not (items_dir/filename).exists(), id
  per100={}
  for key in keys:
   label,unit=FIELD_MAP[key];row=nutrients[label]
   assert row['含量單位']==unit,(code,key,row['含量單位'])
   value=row['每100克含量'].strip()
   if value=='':continue
   assert re.fullmatch(r'\d+(?:\.\d+)?',value),(code,key,value)
   per100[key]=float(value)
  assert 'kcal' in per100
  name=raw['樣品名稱']
  if name in existing_names:name+='（食藥署樣品）'
  assert name not in existing_names,(code,name)
  state_match=re.search(r'樣品狀態:([^;；]+)',raw['內容物描述'])
  state=state_match.group(1).strip() if state_match else '依來源前處理描述'
  grams=5 if source_category in ['調味料及香辛料類','油脂類','糖類'] else 100
  aliases=[raw['樣品名稱']]+re.split(r'[,，;；、/\n]+',raw['俗名'])+[raw['樣品英文名稱']]
  aliases=list(dict.fromkeys(a.strip() for a in aliases if a.strip()))
  category,emoji=CATEGORY[source_category]
  highlights=[source_category, '食藥署樣品']
  for key,label in [('protein','蛋白質'),('fat','脂肪')]:
   if key in per100:highlights.append(f'{label} {per100[key]:g} 克／100 公克')
  summary=f'{raw["樣品名稱"]}；{source_category}，{state}。每 100 公克可食部分約 {per100["kcal"]:g} 大卡。'
  shape={'type':'mound','thickness':2,'min':0.5,'max':10,'fill':1 if source_category in ['飲料類','油脂類'] else 0.6}
  food={'id':id,'name':name,'emoji':emoji,'category':category,'subcategory':source_category,
   'aliases':aliases,'summary':summary,'shape':shape,'density':1,'edibleRatio':1,
   'serving':{'label':f'可食部分 {grams} 公克','grams':grams},'per100g':per100,
   'highlights':highlights,'benefits':[],'cautions':[],
   'tips':raw['內容物描述']+'。請依來源狀態秤可食部分，生熟重量不能互換；包裝或調理食品優先參考實際營養標示。',
   'sources':[{'title':'食藥署食品營養成分資料集（8543）','url':DATASET_URL,
    'downloadUrl':DOWNLOAD_URL,'sampleId':code,'originalDescription':raw['樣品名稱'],
    'preparation':raw['內容物描述'],'accessed':ACCESSED}],
   'dataNotes':{'sourceSet':SOURCE_SET,'sourceRecord':'TFDA:'+code,
    'basis':'每 100 公克可食部分；原始生熟、加工及取樣狀態依樣品原名與前處理描述。',
    'missingNutrients':[key for key in keys if key not in per100],
    'estimation':'圖形及 density=1 為介面暫定估值，非實測物性；edibleRatio=1 僅適用可食部分，建議優先秤重。',
    'sugar':'總糖，非添加糖；原始空白不以零代填。',
    'foodSafety':'來源的生重資料不是生食安全認證。'}}
  write_json(items_dir/filename,food)
  existing_names.add(name);existing_ids.add(id);coverage[code]=filename;created+=1
 assert set(samples)<=set(coverage)
 source_dir=ROOT/'foods/sources/tfda-complete'
 category_records=[]
 for n,(category,records) in enumerate(sorted(groups.items()),1):
  filename=f'category-{n:02d}.json'
  write_json(source_dir/filename,{'sourceCategory':category,'records':records},compact=True)
  category_records.append({'sourceCategory':category,'file':filename,'count':len(records)})
 imported=0
 for code in samples:
  food=json.loads((items_dir/coverage[code]).read_text())
  imported+=food.get('dataNotes',{}).get('sourceSet')==SOURCE_SET
 manifest={'version':1,'sourceSet':SOURCE_SET,'datasetUrl':DATASET_URL,'downloadUrl':DOWNLOAD_URL,
  'accessed':ACCESSED,'archiveSha256':hashlib.sha256(args.archive.read_bytes()).hexdigest(),
  'csvSha256':hashlib.sha256(csv_bytes).hexdigest(),'sampleCount':len(samples),'fieldCount':len(fields),
  'importedCount':imported,'reusedCount':len(samples)-imported,'fields':fields,
  'nutrientMappings':{key:{'fieldIndex':field_index[name],'unit':unit} for key,(name,unit) in FIELD_MAP.items()},
  'categories':category_records,'coverage':{code:coverage[code] for code in sorted(samples)}}
 write_json(source_dir/'index.json',manifest)
 print(f'TFDA {len(samples)} 筆全部覆蓋；本次建立 {created} 筆，本批累計 {imported} 筆，沿用 {len(samples)-imported} 筆。')

if __name__=='__main__':main()
