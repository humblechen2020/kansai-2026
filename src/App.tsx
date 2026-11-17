import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plane,
  Building2,
  MapPin,
  Phone,
  Volume2,
  Search,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
  Sun,
  CloudSun,
  Footprints,
  Coffee,
  Utensils,
  ShoppingBag,
  Train,
  Camera,
  HeartHandshake,
  Edit3,
  RotateCcw,
  Maximize2,
  X,
  ExternalLink,
  ShieldAlert,
  Info,
  Clock,
  Navigation,
  CheckCircle2,
  Users
} from 'lucide-react';

// ==========================================
// 預設行程與旅遊資料庫 (2026/11/26 - 12/01)
// ==========================================
const DEFAULT_TRIP_DATA = {
  tripTitle: '2026 關西家族賞楓銀杏之旅',
  tripSubtitle: '台中直飛神戶・星宇航空・大阪京都神戶六日慢遊',
  dateRange: '2026/11/26 (週四) － 12/01 (週二)',
  contacts: {
    leaderName: '家族總召（請點右上編輯設定姓名）',
    leaderPhone: '0912-345-678',
    secondName: '副領隊 / 備用聯絡人',
    secondPhone: '0987-654-321',
    japanEmergency: '110 (警察) / 119 (救護車)',
    taiwanRepOsaka: '+81-6-6443-8481 (駐大阪辦事處)',
    taiwanRepEmergency: '+81-90-8794-4568 (急難救助專線)'
  },
  flights: {
    outbound: {
      type: '去程航班',
      date: '2026/11/26 (週四)',
      airline: '星宇航空 STARLUX',
      flightNo: 'JX306 (台中直飛神戶)',
      depAirport: '台中清泉崗機場 (RMQ)',
      depTerminal: '第 2 航廈 (國際線)',
      depTime: '08:45 (建議 06:45 抵達機場集合)',
      arrAirport: '神戶機場 (UKB)',
      arrTerminal: '第 2 航廈 (國際航廈)',
      arrTime: '12:30 (日本時間)',
      duration: '約 2 小時 45 分',
      note: '星宇航空機上提供免費熱茶、濃湯與精緻餐點，長輩若需溫開水或毛毯可隨時請空服員協助。'
    },
    inbound: {
      type: '回程航班',
      date: '2026/12/01 (週二)',
      airline: '星宇航空 STARLUX',
      flightNo: 'JX307 (神戶直飛台中)',
      depAirport: '神戶機場 (UKB)',
      depTerminal: '第 2 航廈 (國際航廈)',
      depTime: '13:30 (建議 11:00 抵達機場報到)',
      arrAirport: '台中清泉崗機場 (RMQ)',
      arrTerminal: '第 2 航廈 (國際線)',
      arrTime: '15:45 (台灣時間)',
      duration: '約 3 小時 15 分',
      note: '回程請留意免稅品液體、果凍與布丁類需託運；行動電源與備用電池「嚴禁託運」，必須隨身攜帶上飛機！'
    }
  },
  hotels: [
    {
      id: 'hotel-1',
      nights: 'Day 1 ~ Day 5 住宿（大阪核心區・連住免搬行李）',
      nameZh: '大阪御堂筋 / 難波梅田精選飯店 (可按右上編輯修改實際飯店)',
      nameJa: 'ホテル ロイヤルクラシック大阪 (或同級大阪市中心飯店)',
      addressJa: '〒542-0076 大阪府大阪市中央区難波4丁目3-3',
      addressZh: '大阪府大阪市中央區難波 4-3-3（地下鐵難波站 / 御堂筋線直結）',
      phone: '+81-6-6633-0030',
      checkIn: '15:00 後',
      checkOut: '11:00 前',
      nearby: '步行 2 分鐘內有 7-11、Lawson、大國藥妝與高島屋百貨，長輩隨時回房午休超方便！',
      mapQuery: '難波駅 大阪'
    },
    {
      id: 'hotel-2',
      nights: '備註 / 第二間住宿（若有分開住宿可填寫於此）',
      nameZh: '京都或神戶備用住宿資訊卡',
      nameJa: '京都駅前 / 神戸三宮ホテル',
      addressJa: '〒600-8216 京都府京都市下京区東塩小路町',
      addressZh: '京都市下京區東鹽小路町（京都車站步行圈）',
      phone: '+81-75-361-1111',
      checkIn: '15:00 後',
      checkOut: '11:00 前',
      nearby: '周邊有伊勢丹百貨、地下街餐廳與無障礙電梯通道。',
      mapQuery: '京都駅'
    }
  ],
  days: [
    {
      dayNumber: 1,
      date: '11/26 (四)',
      title: '抵達神戶・安藤忠雄建築美學與金色御堂筋',
      area: '台中 ➔ 神戶 ➔ 大阪御堂筋',
      weatherTip: '約 10°C ~ 16°C｜海邊微涼，建議洋蔥式穿搭（保暖內搭＋防風外套）',
      walkingLevel: '輕鬆慢遊（多數路段平坦、有電梯與完善休息座位）',
      highlight: '星宇航空直飛神戶、兵庫縣立美術館大青蛙與海岸風光、御堂筋金黃銀杏大道與聖誕點燈',
      customNote: '第一天剛下飛機不趕路，下午在美術館喝咖啡看海，傍晚到大阪賞銀杏吃好料！',
      stops: [
        {
          id: 'd1-1',
          time: '06:45 - 12:30',
          category: '交通',
          title: '台中清泉崗機場 (RMQ) ➔ 神戶機場 (UKB)',
          summary: '搭乘星宇航空客機飛往日本關西神戶機場，航程舒適平穩。',
          restroom: '機場與機上皆有完善無障礙洗手間',
          seating: '候機室座位充足，登機門旁有飲水機可裝溫熱水',
          terrain: '全程平坦、設有電扶梯與電梯',
          details: '【集合提醒】請攜帶護照正本（效期滿6個月以上）、隨身常備藥、行動電源（務必隨身攜帶不可託運）。抵達神戶機場第2航廈後，通關動線單純免走遠路，對長輩非常友善。',
          mapQuery: '神戸空港'
        },
        {
          id: 'd1-2',
          time: '14:00 - 16:00',
          category: '景點',
          title: '兵庫縣立美術館（安藤忠雄建築代表作）',
          summary: '欣賞建築大師安藤忠雄設計的清水模美學、旋轉樓梯與可愛的巨型「美子青蛙」！',
          restroom: '館內每一層樓皆有寬敞乾淨的洗手間與免治馬桶',
          seating: '館內設有咖啡廳與多處面海觀景長椅，走累隨時可坐',
          terrain: '無障礙坡道與電梯極為完善，推輪椅或慢走都非常輕鬆',
          details: '【必拍亮點】1. 屋頂巨大的綠色青蛙「Sun Sister (美子)」。2. 戶外圓形下沉廣場與幾何光影迴廊。3. 面對神戶港的海濱散步道。長輩若不想走樓梯，館內大型透明電梯可直接通往各樓層。',
          mapQuery: '兵庫県立美術館'
        },
        {
          id: 'd1-3',
          time: '17:00 - 20:00',
          category: '賞楓銀杏',
          title: '大阪飯店 Check-in ＆ 御堂筋金黃銀杏大道點燈',
          summary: '漫步大阪最具代表性的「御堂筋銀杏並木」，11月底正值滿地金黃與冬季璀璨點燈！',
          restroom: '沿途百貨公司（大丸、高島屋、心齋橋PARCO）皆有高級洗手間',
          seating: '百貨地下街與咖啡廳密集，隨時可入內吹暖氣休息',
          terrain: '人行道寬敞平坦，完全沒有山坡階梯',
          details: '【賞景重點】11月下旬至12月初是御堂筋約800棵銀杏樹轉為金黃色的最美時刻，入夜後更有「御堂筋 Illumination」浪漫燈海，金色燈光映照銀杏葉，非常適合全家拍大合照！晚餐於難波/心齋橋享用熱騰騰的日式鍋物或大阪美食。',
          mapQuery: '御堂筋 いちょう並木'
        }
      ]
    },
    {
      dayNumber: 2,
      date: '11/27 (五)',
      title: '京都千年古剎・通天橋火紅楓海與百年大銀杏',
      area: '京都（東福寺・西本願寺・京都車站）',
      weatherTip: '約 8°C ~ 15°C｜京都早晚偏冷，建議配戴圍巾、穿好走防滑的健走鞋',
      walkingLevel: '中等（東福寺人潮較多有部分階梯，西本願寺則全平坦）',
      highlight: '京都賞楓第一名所「東福寺通天橋」紅葉雲海、西本願寺400年逆向生長大銀杏',
      customNote: '今天風景最震撼！在東福寺不趕時間慢慢走，累了就到西本願寺看超巨大的金黃銀杏樹。',
      stops: [
        {
          id: 'd2-1',
          time: '09:30 - 12:00',
          category: '賞楓銀杏',
          title: '京都東福寺（通天橋・臥雲橋紅葉雲海）',
          summary: '日本賞楓排行榜第一名！超過兩千株火紅楓葉鋪滿溪谷，如紅雲般壯觀。',
          restroom: '入園處與本堂旁設有大型公共洗手間（建議入園前先使用）',
          seating: '方丈庭園迴廊與本堂周邊有木造長椅可供長輩歇腳賞楓',
          terrain: '洗玉澗溪谷步道有高低差，建議長輩主要走平坦的「本堂周邊與通天橋主廊道」即可飽覽美景',
          details: '【長輩貼心攻略】東福寺的「通天橋」望出去就是整片火紅楓海，不必走下溪谷就能拍出明信片級大景！若人潮較多請牽好長輩慢行。',
          mapQuery: '東福寺 京都'
        },
        {
          id: 'd2-2',
          time: '12:30 - 14:00',
          category: '美食',
          title: '京都風味午膳（湯豆腐料理 / 京都車站美食街）',
          summary: '品嚐溫潤養生的京都傳統湯豆腐、京料理或精緻定食，暖胃又清爽。',
          restroom: '餐廳內設有乾淨洗手間',
          seating: '特別安排一般桌椅座位（免跪坐榻榻米，保護長輩膝蓋）',
          terrain: '室內平坦舒適',
          details: '【飲食照顧】湯豆腐口感軟嫩、溫熱清淡，非常合長輩胃口；年輕人也可加點天婦羅、和牛或宇治抹茶甜點。',
          mapQuery: '京都駅'
        },
        {
          id: 'd2-3',
          time: '14:30 - 16:30',
          category: '賞楓銀杏',
          title: '世界文化遺產・西本願寺（百年巨型黃金銀杏）',
          summary: '免費參觀！境內兩棵樹齡約400年的「逆向生長大銀杏」金黃耀眼，氣勢驚人。',
          restroom: '境內聞法會館與參拜服務處設有現代化無障礙洗手間',
          seating: '廣場寬闊，御影堂與阿彌陀堂外廊皆可坐下休息曬太陽',
          terrain: '境內地面極為開闊平坦，人潮比清水寺少很多，長輩逛起來最舒服！',
          details: '【必看奇景】御影堂前的「水吹銀杏（水吹きイチョウ）」樹冠向四周橫向展開，宛如一把巨大的黃金大傘，11月底正是金黃最飽滿的巔峰期！',
          mapQuery: '西本願寺 京都'
        }
      ]
    },
    {
      dayNumber: 3,
      date: '11/28 (六)',
      title: '太陽之塔紅葉溪谷・夜間光影植物園奇幻夜',
      area: '大阪（萬博紀念公園・LaLaport・長居植物園 teamLab）',
      weatherTip: '約 9°C ~ 15°C｜晚上看戶外光影展氣溫較低，請準備暖暖包與毛帽',
      walkingLevel: '舒適彈性（公園旁邊就是超大型商場，隨時可進室內休息喝茶）',
      highlight: '萬博紀念公園「太陽之塔」與日本庭園楓葉祭、夜間 teamLab 植物園夢幻光影藝術',
      customNote: '白天看楓葉與太陽之塔，下午在商場吹暖氣喝下午茶休息，傍晚再去超美的光影植物園！',
      stops: [
        {
          id: 'd3-1',
          time: '10:00 - 13:00',
          category: '賞楓銀杏',
          title: '萬博紀念公園（太陽之塔・日本庭園・紅葉溪）',
          summary: '大阪秋季賞楓秘境！近萬棵紅楓與金黃銀杏交織，還有壯觀的地標「太陽之塔」。',
          restroom: '園區內每隔 200 公尺就有洗手間與無障礙廁所',
          seating: '日本庭園內有茶室、涼亭與大量景觀長椅，還可搭園內遊園小火車代步',
          terrain: '步道寬敞平緩，長輩可搭「森林小火車」輕鬆遊園免久走',
          details: '【賞楓重點】11月底正好遇上「萬博紀念公園紅葉祭」，日本庭園的池泉倒映楓紅極美，長輩也能在傳統茶室品嚐抹茶與和菓子。',
          mapQuery: '万博記念公園 太陽の塔'
        },
        {
          id: 'd3-2',
          time: '13:00 - 16:30',
          category: '購物',
          title: 'LaLaport EXPOCITY 午餐與午後悠閒時光',
          summary: '就在公園正對面！集結美食餐廳、超市、藥妝與咖啡廳，長輩休息、年輕人逛街兩相宜。',
          restroom: '大型百貨級五星洗手間，每層皆有休息沙發區',
          seating: '館內有星巴克、日式喫茶店與寬敞美食街座位',
          terrain: '全室內吹暖氣、手扶梯與電梯齊全',
          details: '【家族分流推薦】年輕人可逛日本休閒服飾、戶外用品與伴手禮；長輩可在咖啡廳悠閒喝熱茶吃甜點，養足精神準備看晚上的光影展。',
          mapQuery: 'ららぽーとEXPOCITY'
        },
        {
          id: 'd3-3',
          time: '18:00 - 20:00',
          category: '景點',
          title: '大阪長居植物園 teamLab Botanical Garden',
          summary: '夜晚的植物園化身為奇幻光影世界！發光的彩蛋森林、楓紅夜楓與浮游光球超夢幻。',
          restroom: '入園大門與園區中段皆設有洗手間（建議入場前先去）',
          seating: '園區步道沿途設有長椅，可坐著靜靜欣賞燈光變幻與音樂',
          terrain: '全程為平地植物園步道，夜間光線較暗請家人牽著長輩慢慢走',
          details: '【必拍亮點】1. 隨風變色發光的「呼應之樹」與「發光蛋森林」。2. 大池塘上的發光浮球倒影。長輩可以用手輕推發光大球，球體會變色並發出悅耳和弦聲，互動感十足！',
          mapQuery: '長居植物園 チームラボ'
        }
      ]
    },
    {
      dayNumber: 4,
      date: '11/29 (日)',
      title: '家族歡樂分流日：環球影城狂歡 vs. 慢活賞楓下午茶',
      area: 'A線：日本環球影城 USJ ｜ B線：大阪城公園賞楓銀杏＆老派喫茶慢遊',
      weatherTip: '約 9°C ~ 16°C｜晴朗舒適，依自己體力選擇最喜歡的路線',
      walkingLevel: '彈性自選（年輕人衝樂園，長輩睡飽慢遊不鐵腿！）',
      highlight: '貼心雙路線分流設計！讓想玩遊樂設施的家人盡情嗨、想輕鬆賞景的長輩優雅慢遊',
      customNote: '今天不勉強大家走一樣的路！年輕組去環球影城，長輩慢活組睡到自然醒去看大阪城黃金銀杏，晚上再一起吃大餐分享照片！',
      stops: [
        {
          id: 'd4-1',
          time: '08:30 - 19:30',
          category: '景點',
          title: '【A線：熱血樂園組】日本環球影城 (USJ) 瑪利歐＆哈利波特',
          summary: '暢玩超級任天堂世界（瑪利歐）、哈利波特魔法世界與小小兵樂園！',
          restroom: '園區內洗手間極多且標示清楚',
          seating: '建議多利用餐廳內用時段或劇場表演（如水世界、歡樂好聲音）坐著休息',
          terrain: '園區廣大，建議下載官方 App 掌握排隊時間與整理券',
          details: '【樂園攻略】1. 入園後先確認「超級任天堂世界」入場時間。2. 若有長輩同行入園，強烈建議欣賞「水世界特技秀」與「魔杖體驗」，坐著看秀精彩又不累！',
          mapQuery: 'ユニバーサル・スタジオ・ジャパン'
        },
        {
          id: 'd4-2',
          time: '10:00 - 16:30',
          category: '賞楓銀杏',
          title: '【B線：長輩慢活組】大阪城公園黃金銀杏大道 ＆ 復古下午茶',
          summary: '睡飽吃早餐後出發！大阪城前 300 年大銀杏與長達1公里的銀杏並木，還可搭遊園小火車。',
          restroom: 'JO-TERRACE OSAKA 商場與天守閣旁皆有完善無障礙洗手間',
          seating: '可搭乘園區「Road Train 觀光小火車」或「御座船」直接坐著看天守閣與楓紅！',
          terrain: '搭配園區代步小火車，幾乎不用爬坡就能輕鬆抵達天守閣下方',
          details: '【長輩尊榮玩法】從大阪城公園站走出來就是「JO-TERRACE」美食街，直接買張小火車票坐到天守閣下，拍完300年大銀杏後，再去大丸百貨或復古喫茶店喝咖啡吃水果千層蛋糕，輕鬆寫意！',
          mapQuery: '大阪城公園'
        },
        {
          id: 'd4-3',
          time: '19:30 - 21:00',
          category: '美食',
          title: '家族全員大集合・道頓堀/梅田慶功晚宴',
          summary: '兩組人馬在飯店或餐廳會合，享用和牛燒肉、螃蟹料理或壽喜燒，熱鬧分享今日趣事！',
          restroom: '餐廳內專用洗手間',
          seating: '寬敞包廂或大桌座位，全家人舒適用餐',
          terrain: '電梯直達餐廳樓層',
          details: '【貼心提醒】若有不吃牛肉或不吃生食的長輩，餐廳皆有提供豬肉、雞肉、熟食海鮮與熱湯釜飯選擇。',
          mapQuery: '道頓堀'
        }
      ]
    },
    {
      dayNumber: 5,
      date: '11/30 (一)',
      title: '北攝森林紅葉瀑布・百貨伴手禮採買與惜別晚宴',
      area: '箕面公園（或嵐山）/ 梅田心齋橋百貨商圈',
      weatherTip: '約 9°C ~ 15°C｜森林山谷空氣清新微涼，記得帶保溫瓶裝溫水',
      walkingLevel: '平緩好走（箕面步道為柏油緩坡，午後百貨逛街隨時可坐）',
      highlight: '品嚐季節限定「炸紅葉天婦羅」、森林芬多精賞楓、最後一晚伴手禮大採買',
      customNote: '倒數第二天！早上吸飽森林芬多精看紅楓，下午把藥妝、零食伴手禮買齊，晚上整理行李不慌張。',
      stops: [
        {
          id: 'd5-1',
          time: '09:30 - 12:30',
          category: '賞楓銀杏',
          title: '箕面國定公園紅葉步道（或京都嵐山渡月橋漫遊）',
          summary: '關西人最愛的賞楓名所！沿途楓紅似火，還能吃到當地獨有的「炸楓葉（もみじの天ぷら）」。',
          restroom: '車站出口、昆蟲館旁與瀧安寺周邊皆設有洗手間',
          seating: '沿著溪谷步道兩旁有許多日式茶屋、足湯與休息長椅',
          terrain: '全程鋪設平整柏油路，長輩不一定要走到最裡面的瀑布，走到「瀧安寺（約1公里平緩路）」風景就已經美不勝收！',
          details: '【長輩不累秘訣】從阪急箕面站散步到「山本咖啡館」與「瀧安寺」這一段最平坦、楓葉也最密集！買包香脆微甜的現炸紅葉餅配熱茶，在紅橋旁拍全家福最棒。',
          mapQuery: '箕面公園 瀧安寺'
        },
        {
          id: 'd5-2',
          time: '13:30 - 18:00',
          category: '購物',
          title: '梅田 / 心齋橋百貨伴手禮採買＆長輩喫茶休息站',
          summary: '大丸、高島屋或阪急百貨地下街一次買齊日本銘菓、藥妝與親友伴手禮！',
          restroom: '百貨公司高規格洗手間，設有免治馬桶與休息化妝室',
          seating: '百貨樓上餐廳街與咖啡廳（如 HARBS、丸福珈琲店）設有舒適沙發座',
          terrain: '全室內恆溫、電梯與手扶梯完善',
          details: '【必買清單推薦】1. 老爺爺起司蛋糕 / 呼吸巧克力。2. 小倉山莊仙貝 / 茅乃舍高湯包（長輩最愛！）。3. 合利他命、溫感貼布與保濕乳液（滿額可辦理免稅，請隨身帶護照）。',
          mapQuery: '心斎橋筋商店街'
        },
        {
          id: 'd5-3',
          time: '18:30 - 20:30',
          category: '美食',
          title: '關西之夜・家族感恩惜別晚宴',
          summary: '旅程最後一晚，全家人舉杯慶祝旅途平安順利，回味滿滿的賞楓銀杏回憶。',
          restroom: '餐廳內設有洗手間',
          seating: '舒適室內座位',
          terrain: '平坦好走',
          details: '【打包提醒】今晚回飯店後請將液體、乳液、果凍、酒類、剪刀指甲刀等全部放入「託運行李箱」；行動電源與備用鋰電池請放「隨身包包」。',
          mapQuery: '難波駅'
        }
      ]
    },
    {
      dayNumber: 6,
      date: '12/01 (二)',
      title: '神戶港灣晨光・滿載回憶平安返抵台中',
      area: '大阪 ➔ 神戶機場 (UKB) ➔ 台中清泉崗機場 (RMQ)',
      weatherTip: '約 10°C ~ 16°C｜返程搭機建議穿著寬鬆舒適的褲裝與外套',
      walkingLevel: '極輕鬆（專車或電車直達神戶機場，通關快速免奔波）',
      highlight: '悠閒享用飯店早餐、神戶機場觀景台與伴手禮補貨、星宇航空直飛回台中溫暖的家',
      customNote: '神戶機場小巧精緻，不用像關西機場走超遠！大家從容報到、逛逛神戶甜點伴手禮，開心回家！',
      stops: [
        {
          id: 'd6-1',
          time: '08:30 - 10:30',
          category: '交通',
          title: '飯店悠閒早餐・退房前往神戶機場',
          summary: '享用豐盛早餐後，檢查隨身物品與護照，乘車前往神戶機場第2航廈。',
          restroom: '飯店大廳與車站皆有洗手間',
          seating: '乘車舒適',
          terrain: '設有電梯搬運行李',
          details: '【退房檢查口訣】手機、護照、錢包、充電器、常備藥！請確認房間保險箱、床頭插座與浴室沒有遺留物品。',
          mapQuery: '神戸空港'
        },
        {
          id: 'd6-2',
          time: '11:00 - 13:30',
          category: '購物',
          title: '神戶機場 (UKB) 報到託運・神戶洋菓子最後巡禮',
          summary: '辦理星宇航空登機手續，機場內可購買神戶風月堂法蘭酥、神戶布丁等名產。',
          restroom: '航廈內無障礙洗手間充足且免排隊',
          seating: '候機室空間舒適，登機距離極短，長輩完全不費力',
          terrain: '全平面無障礙動線',
          details: '【重要提醒】若在未過海關前買「神戶布丁」，請務必在報到前塞入託運行李（果凍/布丁類不可隨身帶過安檢）；過安檢後的免稅店購買則可直接提上飛機。',
          mapQuery: '神戸空港 第2ターミナル'
        },
        {
          id: 'd6-3',
          time: '13:30 - 15:45',
          category: '交通',
          title: '星宇航空 JX307 起飛 ➔ 平安抵達台中清泉崗機場',
          summary: '在機上享用熱騰騰的飛機餐與飲品，下午 15:45 返抵台中，免去桃園拉車之苦！',
          restroom: '機上與台中機場洗手間',
          seating: '星宇航空舒適客艙座位',
          terrain: '抵達台中機場後領取行李即可輕鬆返家',
          details: '【入境台灣提醒】1. 飛機上或免稅店購買的肉製品、新鮮水果、溫泉蛋嚴禁攜帶入境台灣！2. 抵達台中後先向沒同行的親友報個平安，期待下一次的家族旅行！',
          mapQuery: '臺中國際機場'
        }
      ]
    }
  ]
};

// ==========================================
// 景點與分流深度指南資料
// ==========================================
const HIGHLIGHTS_GUIDE = [
  {
    category: '🍁 賞楓與黃金銀杏名所',
    color: 'bg-amber-50 border-amber-300 text-amber-900',
    badgeColor: 'bg-amber-600 text-white',
    items: [
      {
        title: '京都・東福寺「通天橋」',
        tag: '火紅楓海第一名',
        desc: '11月下旬正是超過2,000株三葉楓最火紅的時刻！站在通天橋上俯瞰洗玉澗溪谷，整片楓葉如紅雲般翻湧。',
        seniorTip: '👵 長輩貼心建議：不必走下陡峭的溪谷步道，光是在平坦的本堂外廊與通天橋上拍照，視野就已經是全寺最棒的！'
      },
      {
        title: '京都・西本願寺「逆向生長大銀杏」',
        tag: '400年黃金巨傘',
        desc: '世界文化遺產，免門票且腹地超寬廣！御影堂前的百年大銀杏向四周橫向伸展，滿樹金黃在陽光下閃閃發光。',
        seniorTip: '👵 長輩貼心建議：全區地面平坦好走、沒有階梯，旁邊還有大走廊可以坐著曬太陽，是長輩評價最高的賞銀杏景點。'
      },
      {
        title: '大阪・御堂筋銀杏大道 ＆ 大阪城公園',
        tag: '城市金黃大道＋夜間點燈',
        desc: '大阪最繁華的御堂筋大道兩旁種滿銀杏樹，白天是黃金隧道，夜晚點亮百萬顆彩燈；大阪城更有樹齡300年的大銀杏與天守閣同框。',
        seniorTip: '👵 長輩貼心建議：御堂筋兩旁全是大丸、高島屋等百貨，隨時可以進室內上洗手間或喝熱茶。'
      }
    ]
  },
  {
    category: '🏛️ 大師建築與夜間光影藝術',
    color: 'bg-rose-50 border-rose-300 text-rose-900',
    badgeColor: 'bg-rose-700 text-white',
    items: [
      {
        title: '神戶・兵庫縣立美術館',
        tag: '安藤忠雄建築 × 大青蛙',
        desc: '建築大師安藤忠雄打造的清水模殿堂，緊鄰神戶海濱。屋頂有超可愛的巨型青蛙「美子」，館外還有青蘋果雕像與幾何旋轉階梯。',
        seniorTip: '👵 長輩貼心建議：館內電梯寬敞、海景咖啡廳氣氛極佳，剛下飛機來這裡吹海風喝咖啡最舒服。'
      },
      {
        title: '大阪・萬博紀念公園「太陽之塔」',
        tag: '傳奇地標 × 日式庭園楓紅',
        desc: '1970年大阪萬博留下的壯觀地標「太陽之塔」，搭配後方傳統日本庭園的池泉紅葉，風景開闊大器。',
        seniorTip: '👵 長輩貼心建議：園區很大但設有「遊園小火車」，對面就是 LaLaport 超大商場，完全不用擔心走累。'
      },
      {
        title: '大阪・長居植物園 teamLab 夜間光影展',
        tag: '沉浸式夢幻夜楓與光球',
        desc: '夜晚的植物園結合數位科技，森林與湖面散發柔和彩光，用手輕觸發光巨型彩蛋還會變色並發出悅耳音樂。',
        seniorTip: '👵 長輩貼心建議：全程為平地步道，沿途有長椅可坐著欣賞燈光秀；夜晚較涼記得戴上帽子與圍巾。'
      }
    ]
  },
  {
    category: '👨‍👩‍👧‍👦 家族歡樂分流指南（年輕人盡興、長輩不鐵腿）',
    color: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    badgeColor: 'bg-emerald-700 text-white',
    items: [
      {
        title: '樂園日分流：環球影城 (USJ) vs. 大阪城慢活遊',
        tag: '雙贏不勉強方案',
        desc: '年輕人與小朋友一早衝環球影城玩瑪利歐與哈利波特；長輩睡飽後搭「大阪城小火車＋御座船」，下午去百年喫茶店吃甜點，晚上再會合吃大餐！',
        seniorTip: '💡 為什麼這樣排最好？環球影城需要長時間排隊與大量步行，分流能讓長輩真正放鬆享受假期，年輕人也不用擔心長輩等太久。'
      },
      {
        title: '逛街日分流：心齋橋/梅田購物 vs. 百貨喫茶休息站',
        tag: '定點休息最安心',
        desc: '逛街採買時，先幫長輩安排在百貨公司內的咖啡廳（如丸福珈琲店、HARBS、星巴克）或高島屋休息區坐下喝熱茶，約好 1.5 小時後原地會合。',
        seniorTip: '💡 長輩貼心提醒：隨身帶著本網站的「飯店大字卡」與「手指日語卡」，就算想自己逛超市買水果也完全沒問題！'
      }
    ]
  }
];

// ==========================================
// 手指日語大字卡資料 (Point-and-Speak)
// ==========================================
const JAPANESE_CARDS = [
  {
    id: 'jp-toilet',
    category: '最常用',
    icon: '🚻',
    zh: '請問洗手間在哪裡？',
    ja: 'すみません、トイレはどこですか？',
    romaji: 'Sumimasen, toire wa doko desu ka?',
    subText: '（請指給我看方向，謝謝！）'
  },
  {
    id: 'jp-water',
    category: '餐廳必備',
    icon: '🍵',
    zh: '請給我一杯溫開水 / 熱茶（不要冰塊）',
    ja: 'すみません、白湯（さゆ）か温かいお茶をいただけますか？（氷なしでお願いします）',
    romaji: 'Sayu ka atatakai ocha wo itadakemasu ka? (Koori nashi de)',
    subText: '（日本餐廳預設給冰水，拿這張給店員看就會換成溫熱水或熱茶）'
  },
  {
    id: 'jp-well-done',
    category: '飲食禁忌',
    icon: '🍲',
    zh: '我不吃生食，請幫我做成全熟',
    ja: '生もの（なまもの）は食べられません。よく焼いて（火を通して）ください。',
    romaji: 'Namamono wa taberaremasen. Yoku yaite kudasai.',
    subText: '（長輩腸胃較敏感時，點餐前可先給店員看這張）'
  },
  {
    id: 'jp-no-beef',
    category: '飲食禁忌',
    icon: '🥩',
    zh: '我不吃牛肉，請問這道菜有含牛肉嗎？',
    ja: '牛肉（ぎゅうにく）が食べられません。これに牛肉は入っていますか？',
    romaji: 'Gyuuniku ga taberaremasen. Kore ni gyuuniku wa haitte imasu ka?',
    subText: '（包含牛油或牛骨高湯若也忌口，可一併指給店員看）'
  },
  {
    id: 'jp-less-salt',
    category: '餐廳必備',
    icon: '🍜',
    zh: '口味請幫我做清淡一點（少鹽）',
    ja: '味を薄め（うすめ・塩分控えめ）にしていただけますか？',
    romaji: 'Aji wo usume ni shite itadakemasu ka?',
    subText: '（吃拉麵或日式料理覺得太鹹時非常實用）'
  },
  {
    id: 'jp-tax-free',
    category: '購物結帳',
    icon: '🛍️',
    zh: '請問這裡可以辦理退稅 (Tax-Free) 嗎？',
    ja: 'すみません、免税（めんぜい・Tax Free）はできますか？',
    romaji: 'Menzei wa dekimasu ka?',
    subText: '（未稅滿 5,000 日圓即可退稅，請準備護照正本）'
  },
  {
    id: 'jp-bag',
    category: '購物結帳',
    icon: '袋',
    zh: '請給我一個塑膠袋 / 紙袋',
    ja: '袋（ふくろ）を1枚ください。',
    romaji: 'Fukuro wo ichi-mai kudasai.',
    subText: '（日本超商與藥妝店袋子需收費約 3~10 日圓）'
  },
  {
    id: 'jp-lost',
    category: '交通求助',
    icon: '🚕',
    zh: '請帶我去這個地址（可搭配飯店地址卡）',
    ja: 'すみません、この場所（ホテル）へ行きたいです。道を教えてください。',
    romaji: 'Kono basho e ikitai desu.',
    subText: '（給計程車司機或站務員看，馬上就能幫您指引）'
  }
];

// ==========================================
// 預設行李檢查清單 (長輩互動勾選)
// ==========================================
const DEFAULT_CHECKLIST = [
  { id: 'c1', category: '重要證件與錢包', item: '護照正本（檢查有效期限需滿 6 個月以上）', checked: false },
  { id: 'c2', category: '重要證件與錢包', item: '日幣現金（分開放在兩個紅包袋或拉鍊袋更安全）＆ 信用卡', checked: false },
  { id: 'c3', category: '重要證件與錢包', item: 'Visit Japan Web 入境 QR Code 截圖（或機上填寫紙本入境卡）', checked: false },
  { id: 'c4', category: '長輩健康與常備藥', item: '每日固定服用的慢性病處方藥（建議多帶 3 天備用份量，放隨身包！）', checked: false },
  { id: 'c5', category: '長輩健康與常備藥', item: '腸胃藥、止痛退燒藥、暈車藥、OK繃、痠痛貼布', checked: false },
  { id: 'c6', category: '長輩健康與常備藥', item: '輕量保溫瓶（裝溫開水隨時喝，機上過安檢前請先倒空）', checked: false },
  { id: 'c7', category: '賞楓銀杏保暖穿搭', item: '已經穿習慣、好走防滑的運動鞋/健走鞋（千萬別穿新皮鞋！）', checked: false },
  { id: 'c8', category: '賞楓銀杏保暖穿搭', item: '發熱衣、保暖背心、防風保暖外套（洋蔥式穿法進室內好穿脫）', checked: false },
  { id: 'c9', category: '賞楓銀杏保暖穿搭', item: '圍巾、毛帽、手套、暖暖包（早晚看夜楓與光影展必備）', checked: false },
  { id: 'c10', category: '隨身與飛安規定', item: '行動電源、相機備用電池（⚠️ 嚴禁放入託運行李，必須隨身帶上飛機！）', checked: false },
  { id: 'c11', category: '隨身與飛安規定', item: '護手霜、護唇膏、乳液（日本秋季乾燥，超過100ml請放託運行李）', checked: false },
  { id: 'c12', category: '隨身與飛安規定', item: '折疊雨傘、輕便購物袋、老花眼鏡', checked: false }
];

export default function App() {
  // 1. 字體大小無障礙狀態 ('normal' | 'large' | 'xlarge')
  const [fontScale, setFontScale] = useState(() => {
    try {
      return localStorage.getItem('kansai_2026_font_scale') || 'large';
    } catch {
      return 'large';
    }
  });

  // 2. 主分頁狀態 ('itinerary' | 'flights_hotels' | 'highlights' | 'tools')
  const [activeTab, setActiveTab] = useState('itinerary');

  // 3. 每日行程選擇狀態 (1 ~ 6)
  const [selectedDay, setSelectedDay] = useState(1);

  // 4. 展開詳細資訊的景點卡片集合
  const [expandedStopIds, setExpandedStopIds] = useState({ 'd1-1': true, 'd1-2': true });

  // 5. 旅遊資料庫狀態 (支援自訂編輯並儲存至 localStorage)
  const [tripData, setTripData] = useState(() => {
    try {
      const saved = localStorage.getItem('kansai_2026_trip_data_v1');
      return saved ? JSON.parse(saved) : DEFAULT_TRIP_DATA;
    } catch {
      return DEFAULT_TRIP_DATA;
    }
  });

  // 6. 行李清單狀態
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('kansai_2026_checklist_v1');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  // 7. 彈出式大字卡 Modal 狀態 ('hotel' | 'japanese' | 'emergency' | 'edit' | null)
  const [modalType, setModalType] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);

  // 8. 語音朗讀提示狀態
  const [speakingId, setSpeakingId] = useState(null);

  // 儲存字體大小
  useEffect(() => {
    try {
      localStorage.setItem('kansai_2026_font_scale', fontScale);
    } catch (e) {
      console.error(e);
    }
  }, [fontScale]);

  // 儲存行程資料
  useEffect(() => {
    try {
      localStorage.setItem('kansai_2026_trip_data_v1', JSON.stringify(tripData));
    } catch (e) {
      console.error(e);
    }
  }, [tripData]);

  // 儲存行李清單
  useEffect(() => {
    try {
      localStorage.setItem('kansai_2026_checklist_v1', JSON.stringify(checklist));
    } catch (e) {
      console.error(e);
    }
  }, [checklist]);

  // 根據字體大小模式設定動態樣式
  const fontConfig = {
    normal: {
      baseText: 'text-base',
      subText: 'text-sm',
      cardTitle: 'text-xl',
      sectionTitle: 'text-2xl',
      heroTitle: 'text-2xl sm:text-3xl',
      badge: 'text-sm px-3 py-1',
      btn: 'text-base py-3 px-4'
    },
    large: {
      baseText: 'text-lg leading-relaxed',
      subText: 'text-base leading-relaxed',
      cardTitle: 'text-2xl',
      sectionTitle: 'text-2xl sm:text-3xl',
      heroTitle: 'text-3xl sm:text-4xl',
      badge: 'text-base px-3.5 py-1.5',
      btn: 'text-lg py-3.5 px-5'
    },
    xlarge: {
      baseText: 'text-xl leading-loose',
      subText: 'text-lg leading-relaxed',
      cardTitle: 'text-2xl sm:text-3xl',
      sectionTitle: 'text-3xl sm:text-4xl',
      heroTitle: 'text-3xl sm:text-5xl',
      badge: 'text-lg px-4 py-2',
      btn: 'text-xl py-4 px-6'
    }
  }[fontScale];

  // 切換行程卡片詳細內容
  const toggleStopDetail = (id) => {
    setExpandedStopIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 全部展開 / 全部收合當日行程
  const toggleAllDayStops = (dayObj, expand) => {
    const updates = {};
    dayObj.stops.forEach((s) => {
      updates[s.id] = expand;
    });
    setExpandedStopIds((prev) => ({ ...prev, ...updates }));
  };

  // 勾選行李清單
  const toggleCheckItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 日語語音朗讀功能 (使用瀏覽器內建 Web Speech API)
  const speakJapanese = (text, id) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // 放慢語速方便聽清楚
      setSpeakingId(id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setSpeakingId(null);
    }
  };

  // 恢復預設資料確認狀態
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const handleResetDefault = () => {
    setTripData(DEFAULT_TRIP_DATA);
    setChecklist(DEFAULT_CHECKLIST);
    setShowResetConfirm(false);
    setModalType(null);
  };

  // 取得目前選擇的當日資料
  const currentDayObj = tripData.days.find((d) => d.dayNumber === selectedDay) || tripData.days[0];

  // 分類顏色與圖示對照
  const getCategoryStyle = (cat) => {
    switch (cat) {
      case '賞楓銀杏':
        return {
          bg: 'bg-red-700 text-white',
          border: 'border-l-8 border-l-red-700',
          lightBg: 'bg-red-50 text-red-900 border-red-200',
          icon: <Sparkles className="w-5 h-5" />
        };
      case '美食':
        return {
          bg: 'bg-amber-600 text-white',
          border: 'border-l-8 border-l-amber-600',
          lightBg: 'bg-amber-50 text-amber-900 border-amber-200',
          icon: <Utensils className="w-5 h-5" />
        };
      case '購物':
        return {
          bg: 'bg-emerald-700 text-white',
          border: 'border-l-8 border-l-emerald-700',
          lightBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          icon: <ShoppingBag className="w-5 h-5" />
        };
      case '交通':
        return {
          bg: 'bg-sky-700 text-white',
          border: 'border-l-8 border-l-sky-700',
          lightBg: 'bg-sky-50 text-sky-900 border-sky-200',
          icon: <Train className="w-5 h-5" />
        };
      default:
        return {
          bg: 'bg-purple-700 text-white',
          border: 'border-l-8 border-l-purple-700',
          lightBg: 'bg-purple-50 text-purple-900 border-purple-200',
          icon: <Camera className="w-5 h-5" />
        };
    }
  };

  // 行李完成度計算
  const completedCount = checklist.filter((c) => c.checked).length;

  return (
    <div className={`min-h-screen bg-[#FDFBF7] text-stone-900 font-sans pb-28 ${fontConfig.baseText}`}>
      {/* ==========================================
          頂部固定無障礙導覽列 (字體大小切換 + 自訂編輯)
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* 左側：迷你標題 */}
          <div
            onClick={() => {
              setActiveTab('itinerary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl" role="img" aria-label="maple">
              🍁
            </span>
            <div>
              <div className="font-extrabold text-red-900 text-base sm:text-lg leading-tight">
                2026 關西家族賞楓銀杏
              </div>
              <div className="text-xs sm:text-sm text-stone-600 font-medium">
                11/26 (四) - 12/01 (二) 台中直飛神戶
              </div>
            </div>
          </div>

          {/* 右側：長輩字體放大器 & 編輯按鈕 */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center bg-stone-200/90 p-1 rounded-xl border border-stone-300">
              <span className="text-xs sm:text-sm font-bold text-stone-700 px-2 hidden md:inline">
                字體大小：
              </span>
              <button
                onClick={() => setFontScale('normal')}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-sm transition-all ${
                  fontScale === 'normal'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-stone-700 hover:bg-stone-300'
                }`}
                aria-label="標準字體"
              >
                標準
              </button>
              <button
                onClick={() => setFontScale('large')}
                className={`px-3 py-1.5 rounded-lg font-bold text-base transition-all ${
                  fontScale === 'large'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-stone-700 hover:bg-stone-300'
                }`}
                aria-label="大字模式"
              >
                大字
              </button>
              <button
                onClick={() => setFontScale('xlarge')}
                className={`px-3 py-1.5 rounded-lg font-extrabold text-lg transition-all ${
                  fontScale === 'xlarge'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-stone-700 hover:bg-stone-300'
                }`}
                aria-label="特大字模式"
              >
                特大
              </button>
            </div>

            <button
              onClick={() => setModalType('edit')}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-3 py-2 rounded-xl border border-amber-400 transition-colors text-sm sm:text-base"
              title="編輯航班、飯店或領隊電話"
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
              <span className="hidden sm:inline">編輯資訊</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          主視覺橫幅與四大長輩一鍵快捷卡
      ========================================== */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-amber-700 text-white pt-6 pb-8 px-4 sm:px-6 border-b-4 border-amber-400 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/50 text-amber-100 px-3.5 py-1 rounded-full text-sm sm:text-base font-bold mb-3">
            <span>✈️ 星宇航空・台中清泉崗 (RMQ) ⇄ 神戶機場 (UKB)</span>
          </div>

          <h1 className={`${fontConfig.heroTitle} font-black tracking-tight mb-2 drop-shadow-sm`}>
            {tripData.tripTitle}
          </h1>
          <p className="text-amber-100 font-medium text-lg sm:text-xl mb-6">
            📅 出發日期：{tripData.dateRange}（共 6 天 5 夜・長輩友善慢遊版）
          </p>

          {/* 四大超大一鍵快捷按鈕 (長輩最常按的功能) */}
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/20">
            <div className="text-amber-200 font-bold text-sm sm:text-base mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5" />
              <span>長輩一鍵常用快捷鍵（直接點選下方大按鈕）：</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 快捷 1：看每日行程 */}
              <button
                onClick={() => {
                  setActiveTab('itinerary');
                  const el = document.getElementById('main-content-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-start justify-between bg-[#FFFDF9] hover:bg-amber-50 text-stone-900 p-4 rounded-2xl shadow-md border-2 border-amber-300 transition-transform active:scale-95 text-left min-h-[104px]"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl sm:text-3xl">📅</span>
                  <span className="bg-red-100 text-red-800 text-xs font-extrabold px-2 py-0.5 rounded-full">
                    最常用
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-red-900">看每日行程</div>
                  <div className="text-xs sm:text-sm text-stone-600 font-medium">
                    景點・洗手間・休息站
                  </div>
                </div>
              </button>

              {/* 快捷 2：飯店地址給司機看 */}
              <button
                onClick={() => {
                  setSelectedModalData(tripData.hotels[0]);
                  setModalType('hotel');
                }}
                className="flex flex-col items-start justify-between bg-[#FFFDF9] hover:bg-amber-50 text-stone-900 p-4 rounded-2xl shadow-md border-2 border-amber-300 transition-transform active:scale-95 text-left min-h-[104px]"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl sm:text-3xl">🚕</span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2 py-0.5 rounded-full">
                    放大字卡
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-amber-900">飯店給司機看</div>
                  <div className="text-xs sm:text-sm text-stone-600 font-medium">
                    日文地址全螢幕放大
                  </div>
                </div>
              </button>

              {/* 快捷 3：航班與集合時間 */}
              <button
                onClick={() => {
                  setActiveTab('flights_hotels');
                  const el = document.getElementById('main-content-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-start justify-between bg-[#FFFDF9] hover:bg-amber-50 text-stone-900 p-4 rounded-2xl shadow-md border-2 border-amber-300 transition-transform active:scale-95 text-left min-h-[104px]"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl sm:text-3xl">✈️</span>
                  <span className="bg-sky-100 text-sky-900 text-xs font-extrabold px-2 py-0.5 rounded-full">
                    星宇航空
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-sky-900">航班與住宿</div>
                  <div className="text-xs sm:text-sm text-stone-600 font-medium">
                    航廈・集合時間・行李規定
                  </div>
                </div>
              </button>

              {/* 快捷 4：手指日語與緊急聯絡 */}
              <button
                onClick={() => {
                  setModalType('emergency');
                }}
                className="flex flex-col items-start justify-between bg-[#FFFDF9] hover:bg-amber-50 text-stone-900 p-4 rounded-2xl shadow-md border-2 border-amber-300 transition-transform active:scale-95 text-left min-h-[104px]"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl sm:text-3xl">🗣️</span>
                  <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2 py-0.5 rounded-full">
                    手指溝通
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-emerald-900">日語卡＆聯絡人</div>
                  <div className="text-xs sm:text-sm text-stone-600 font-medium">
                    找廁所・要溫水・打給家人
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          主導覽分頁按鈕列 (超大清晰四分頁)
      ========================================== */}
      <div id="main-content-anchor" className="max-w-5xl mx-auto px-3 sm:px-6 pt-5">
        <nav
          aria-label="主功能分頁"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-stone-200/80 p-2 rounded-2xl border-2 border-stone-300"
        >
          {[
            { id: 'itinerary', label: '📅 每日行程', sub: 'Day 1 ~ Day 6' },
            { id: 'flights_hotels', label: '✈️ 航班與住宿', sub: '星宇航空・飯店卡' },
            { id: 'highlights', label: '🍁 景點與分流', sub: '賞楓名所・雙路線' },
            { id: 'tools', label: '🧰 手指日語＆清單', sub: '點餐問路・行李勾選' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl font-extrabold transition-all border-2 ${
                  isActive
                    ? 'bg-red-800 text-white border-red-900 shadow-md scale-[1.01]'
                    : 'bg-white text-stone-800 border-transparent hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <span className="text-lg sm:text-xl">{tab.label}</span>
                <span
                  className={`text-xs sm:text-sm font-medium mt-0.5 ${
                    isActive ? 'text-amber-200' : 'text-stone-500'
                  }`}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ==========================================
          分頁內容區
      ========================================== */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-6">
        {/* ------------------------------------------
            分頁 1：📅 每日行程 (Daily Itinerary)
        ------------------------------------------ */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {/* 天數選擇器 (Day 1 ~ Day 6 超大按鈕) */}
            <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm">
              <div className="text-stone-700 font-extrabold mb-3 flex items-center justify-between">
                <span>👇 請點選要查看的旅遊天數：</span>
                <span className="text-sm text-red-800 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  目前顯示：第 {selectedDay} 天 ({currentDayObj.date})
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {tripData.days.map((d) => {
                  const active = d.dayNumber === selectedDay;
                  return (
                    <button
                      key={d.dayNumber}
                      onClick={() => setSelectedDay(d.dayNumber)}
                      className={`py-3 px-2 rounded-xl font-extrabold border-2 transition-all flex flex-col items-center justify-center ${
                        active
                          ? 'bg-amber-500 text-stone-950 border-amber-700 shadow-md ring-2 ring-amber-300'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-amber-50'
                      }`}
                    >
                      <span className="text-lg sm:text-xl font-black">第 {d.dayNumber} 天</span>
                      <span className="text-sm sm:text-base font-bold mt-0.5">{d.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 當日總覽重點卡 (天氣、穿搭、步行強度、領隊叮嚀) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-400 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="bg-red-800 text-white font-extrabold px-4 py-1.5 rounded-full text-base sm:text-lg">
                  Day {currentDayObj.dayNumber} ・ {currentDayObj.date}
                </span>
                <span className="bg-white text-amber-900 font-bold px-3.5 py-1 rounded-full border border-amber-300 text-sm sm:text-base">
                  📍 區域：{currentDayObj.area}
                </span>
              </div>

              <h2 className={`${fontConfig.sectionTitle} font-black text-red-950 mb-4`}>
                {currentDayObj.title}
              </h2>

              {/* 三大長輩安心指標：重點、穿搭、步行強度 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
                <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm">
                  <div className="flex items-center gap-2 font-extrabold text-red-800 mb-1">
                    <Sparkles className="w-5 h-5 shrink-0" />
                    <span>今日賞景重點</span>
                  </div>
                  <p className={`${fontConfig.subText} text-stone-800 font-medium`}>
                    {currentDayObj.highlight}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm">
                  <div className="flex items-center gap-2 font-extrabold text-amber-800 mb-1">
                    <CloudSun className="w-5 h-5 shrink-0" />
                    <span>氣溫與穿搭建議</span>
                  </div>
                  <p className={`${fontConfig.subText} text-stone-800 font-medium`}>
                    {currentDayObj.weatherTip}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-800 mb-1">
                    <Footprints className="w-5 h-5 shrink-0" />
                    <span>長輩步行輕鬆度</span>
                  </div>
                  <p className={`${fontConfig.subText} text-stone-800 font-medium`}>
                    {currentDayObj.walkingLevel}
                  </p>
                </div>
              </div>

              {/* 家族貼心小叮嚀 */}
              {currentDayObj.customNote && (
                <div className="bg-amber-200/60 border-l-4 border-red-800 p-3.5 rounded-r-xl flex items-start gap-2.5">
                  <HeartHandshake className="w-6 h-6 text-red-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-red-950">家族溫馨提醒：</span>
                    <span className="text-stone-900 font-medium">{currentDayObj.customNote}</span>
                  </div>
                </div>
              )}

              {/* 全部展開 / 收合控制鈕 */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-amber-200">
                <button
                  onClick={() => toggleAllDayStops(currentDayObj, true)}
                  className="text-sm sm:text-base font-bold text-red-900 bg-white hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-300"
                >
                  ＋ 展開今日全部細節
                </button>
                <button
                  onClick={() => toggleAllDayStops(currentDayObj, false)}
                  className="text-sm sm:text-base font-bold text-stone-700 bg-white hover:bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-300"
                >
                  － 收合為簡潔字卡
                </button>
              </div>
            </div>

            {/* 當日各站時間軸卡片 */}
            <div className="space-y-5">
              {currentDayObj.stops.map((stop, idx) => {
                const style = getCategoryStyle(stop.category);
                const isExpanded = !!expandedStopIds[stop.id];

                return (
                  <article
                    key={stop.id}
                    className={`bg-white rounded-2xl shadow-md border-2 border-stone-200 overflow-hidden transition-all ${style.border}`}
                  >
                    <div className="p-5 sm:p-6">
                      {/* 時間與分類標籤 */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-stone-800 text-white font-extrabold px-3.5 py-1 rounded-lg text-base sm:text-lg flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-400" />
                            {stop.time}
                          </span>
                          <span
                            className={`${style.bg} font-extrabold px-3 py-1 rounded-lg text-sm sm:text-base flex items-center gap-1.5`}
                          >
                            {style.icon}
                            {stop.category}
                          </span>
                        </div>
                        <span className="text-stone-500 font-bold text-sm">
                          第 {idx + 1} 站
                        </span>
                      </div>

                      {/* 景點大標題與一句話簡介 */}
                      <h3 className={`${fontConfig.cardTitle} font-black text-stone-900 mb-2`}>
                        {stop.title}
                      </h3>
                      <p className={`${fontConfig.baseText} text-stone-700 font-medium mb-4`}>
                        {stop.summary}
                      </p>

                      {/* 長輩最關心的三大貼心指標 (洗手間 / 休息座位 / 路面狀況) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200 mb-4">
                        <div className="flex items-start gap-2">
                          <span className="text-xl shrink-0" role="img" aria-label="restroom">
                            🚻
                          </span>
                          <div>
                            <div className="text-xs font-extrabold text-stone-500">洗手間資訊</div>
                            <div className="text-sm sm:text-base font-bold text-stone-800">
                              {stop.restroom}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-xl shrink-0" role="img" aria-label="seating">
                            🪑
                          </span>
                          <div>
                            <div className="text-xs font-extrabold text-stone-500">休息與座位</div>
                            <div className="text-sm sm:text-base font-bold text-stone-800">
                              {stop.seating}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-xl shrink-0" role="img" aria-label="walking">
                            🚶
                          </span>
                          <div>
                            <div className="text-xs font-extrabold text-stone-500">路面與步伐</div>
                            <div className="text-sm sm:text-base font-bold text-stone-800">
                              {stop.terrain}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 展開詳細資訊與 Google Maps 按鈕列 */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => toggleStopDetail(stop.id)}
                          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 font-extrabold rounded-xl border-2 transition-colors ${fontConfig.btn} ${
                            isExpanded
                              ? 'bg-stone-200 text-stone-900 border-stone-400'
                              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-5 h-5" />
                              <span>收合詳細攻略</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-5 h-5" />
                              <span>點我看詳細介紹・必吃必拍</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            stop.mapQuery
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-sm transition-colors ${fontConfig.btn}`}
                        >
                          <Navigation className="w-5 h-5" />
                          <span>Google 地圖導航</span>
                        </a>
                      </div>

                      {/* 展開後的深度資訊區 */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t-2 border-dashed border-stone-300 bg-amber-50/70 p-4 rounded-xl">
                          <div className="font-extrabold text-red-900 mb-1.5 flex items-center gap-1.5">
                            <Info className="w-5 h-5" />
                            <span>深入導覽與貼心叮嚀：</span>
                          </div>
                          <p className={`${fontConfig.baseText} text-stone-800 whitespace-pre-line`}>
                            {stop.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 底部切換上/下一天大按鈕 */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <button
                disabled={selectedDay <= 1}
                onClick={() => {
                  setSelectedDay((p) => Math.max(1, p - 1));
                  const el = document.getElementById('main-content-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-1 py-4 px-5 rounded-2xl font-extrabold border-2 text-lg sm:text-xl transition-all ${
                  selectedDay <= 1
                    ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                    : 'bg-white hover:bg-amber-50 text-stone-900 border-stone-400 shadow-sm'
                }`}
              >
                ⬅️ 看前一天 (Day {Math.max(1, selectedDay - 1)})
              </button>

              <button
                disabled={selectedDay >= 6}
                onClick={() => {
                  setSelectedDay((p) => Math.min(6, p + 1));
                  const el = document.getElementById('main-content-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-1 py-4 px-5 rounded-2xl font-extrabold border-2 text-lg sm:text-xl transition-all ${
                  selectedDay >= 6
                    ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                    : 'bg-red-800 hover:bg-red-900 text-white border-red-950 shadow-md'
                }`}
              >
                看下一天 (Day {Math.min(6, selectedDay + 1)}) ➡️
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------
            分頁 2：✈️ 航班與住宿 (Flights & Hotels)
        ------------------------------------------ */}
        {activeTab === 'flights_hotels' && (
          <div className="space-y-8">
            {/* 航班資訊區塊 */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-sky-300 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-stone-200">
                <div className="flex items-center gap-2.5">
                  <span className="bg-sky-700 text-white p-2.5 rounded-xl">
                    <Plane className="w-7 h-7" />
                  </span>
                  <div>
                    <h2 className={`${fontConfig.sectionTitle} font-black text-stone-900`}>
                      星宇航空 (STARLUX) 航班資訊
                    </h2>
                    <p className="text-stone-600 font-bold text-sm sm:text-base">
                      台中清泉崗機場直飛神戶機場，免去桃園拉車與關西機場排隊之苦！
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalType('edit')}
                  className="text-sm font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-xl border border-sky-300 flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  修改航班時間
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {[tripData.flights.outbound, tripData.flights.inbound].map((flight, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-5 border-2 ${
                      i === 0
                        ? 'bg-sky-50/70 border-sky-300'
                        : 'bg-amber-50/70 border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-black px-3.5 py-1 rounded-full text-base sm:text-lg ${
                          i === 0 ? 'bg-sky-800 text-white' : 'bg-amber-700 text-white'
                        }`}
                      >
                        {flight.type} ・ {flight.date}
                      </span>
                      <span className="font-extrabold text-stone-800 bg-white px-3 py-1 rounded-lg border border-stone-300">
                        {flight.flightNo}
                      </span>
                    </div>

                    {/* 起飛與抵達對照 */}
                    <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 mb-3">
                      <div>
                        <div className="text-xs font-extrabold text-stone-500">🛫 出發機場與航廈</div>
                        <div className="font-black text-lg sm:text-xl text-stone-900">
                          {flight.depAirport} — <span className="text-red-700">{flight.depTerminal}</span>
                        </div>
                        <div className="text-stone-700 font-bold mt-0.5">
                          時間：{flight.depTime}
                        </div>
                      </div>

                      <div className="border-t border-dashed border-stone-300 pt-3">
                        <div className="text-xs font-extrabold text-stone-500">🛬 抵達機場與航廈</div>
                        <div className="font-black text-lg sm:text-xl text-stone-900">
                          {flight.arrAirport} — <span className="text-red-700">{flight.arrTerminal}</span>
                        </div>
                        <div className="text-stone-700 font-bold mt-0.5">
                          時間：{flight.arrTime}（飛行 {flight.duration}）
                        </div>
                      </div>
                    </div>

                    <p className={`${fontConfig.subText} text-stone-800 font-medium bg-white/80 p-3 rounded-xl border border-stone-200`}>
                      💡 <strong>貼心提醒：</strong>
                      {flight.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* 飛安與長輩搭機重要規定 */}
              <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-2xl p-4 sm:p-5">
                <h3 className="font-black text-red-900 text-lg sm:text-xl mb-2 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-700 shrink-0" />
                  <span>長輩搭機與行李最重要 4 件事（請務必檢查）：</span>
                </h3>
                <ul className={`space-y-2 text-stone-900 font-medium ${fontConfig.subText}`}>
                  <li>
                    1️⃣ <strong>行動電源、相機鋰電池：</strong>「絕對不可託運」，必須放在隨身包包帶上飛機，且機上全程禁止使用行動電源充電。
                  </li>
                  <li>
                    2️⃣ <strong>長輩每日慢性病藥、眼藥水、保溫瓶：</strong>請放在「隨身背包」隨時取用；保溫瓶過安檢前請先將水倒空，進候機室後再裝溫開水。
                  </li>
                  <li>
                    3️⃣ <strong>液體、乳液、果凍、布丁、剪刀指甲刀：</strong>單瓶超過 100ml 的液體或膏狀物（如日本買的馬油、保濕乳、神戶布丁、味噌）必須放入「大行李箱託運」。
                  </li>
                  <li>
                    4️⃣ <strong>回台灣嚴禁攜帶：</strong>任何含肉類的零食（肉乾、肉鬆、含肉塊泡麵）、新鮮水果、生鮮植物種子皆不可帶回台灣，以免受罰。
                  </li>
                </ul>
              </div>
            </section>

            {/* 飯店住宿與「給計程車司機看」大字卡區塊 */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-400 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-stone-200">
                <div className="flex items-center gap-2.5">
                  <span className="bg-amber-600 text-white p-2.5 rounded-xl">
                    <Building2 className="w-7 h-7" />
                  </span>
                  <div>
                    <h2 className={`${fontConfig.sectionTitle} font-black text-stone-900`}>
                      住宿飯店與「問路大字卡」
                    </h2>
                    <p className="text-stone-600 font-bold text-sm sm:text-base">
                      迷路或搭計程車時，直接點選「🔍 放大給計程車司機看」即可！
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalType('edit')}
                  className="text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl border border-amber-300 flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  修改飯店名稱與地址
                </button>
              </div>

              <div className="space-y-5">
                {tripData.hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-amber-50/60 rounded-2xl p-5 border-2 border-amber-300"
                  >
                    <div className="inline-block bg-amber-800 text-white font-extrabold px-3.5 py-1 rounded-full text-sm sm:text-base mb-2">
                      🏨 {hotel.nights}
                    </div>
                    <h3 className={`${fontConfig.cardTitle} font-black text-stone-900 mb-1`}>
                      {hotel.nameZh}
                    </h3>
                    <div className="text-stone-700 font-extrabold text-base sm:text-lg mb-3">
                      日文名稱：{hotel.nameJa}
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2 mb-4">
                      <div>
                        <span className="font-extrabold text-stone-600">📍 日文地址：</span>
                        <span className="font-black text-stone-900 select-all">{hotel.addressJa}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-stone-600">📍 中文說明：</span>
                        <span className="font-medium text-stone-800">{hotel.addressZh}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <div>
                          <span className="font-extrabold text-stone-600">📞 電話：</span>
                          <a
                            href={`tel:${hotel.phone}`}
                            className="font-bold text-sky-800 underline"
                          >
                            {hotel.phone}
                          </a>
                        </div>
                        <div>
                          <span className="font-extrabold text-stone-600">🕒 入住/退房：</span>
                          <span className="font-bold text-stone-800">
                            {hotel.checkIn} / {hotel.checkOut}
                          </span>
                        </div>
                      </div>
                      <div className="pt-1 text-emerald-900 font-bold">
                        🏪 周邊機能：{hotel.nearby}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setSelectedModalData(hotel);
                          setModalType('hotel');
                        }}
                        className={`flex-1 bg-red-800 hover:bg-red-900 text-white font-black rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 ${fontConfig.btn}`}
                      >
                        <Maximize2 className="w-5 h-5" />
                        <span>🔍 放大給計程車司機 / 路人看</span>
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          hotel.addressJa || hotel.mapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 ${fontConfig.btn}`}
                      >
                        <MapPin className="w-5 h-5" />
                        <span>開啟地圖導航</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------
            分頁 3：🍁 景點與分流指南 (Highlights & Split Guide)
        ------------------------------------------ */}
        {activeTab === 'highlights' && (
          <div className="space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-amber-300 shadow-sm">
              <h2 className={`${fontConfig.sectionTitle} font-black text-red-950 mb-2`}>
                🍁 2026 關西家族賞楓銀杏・精華景點與分流攻略
              </h2>
              <p className={`${fontConfig.baseText} text-stone-700 font-medium`}>
                這趟旅程特別挑選 11 月底至 12 月初「紅葉與銀杏同時見頃（最美時期）」的經典名所，並針對家族中有長輩與年輕人的不同需求，設計了最貼心的雙贏玩法：
              </p>
            </div>

            {HIGHLIGHTS_GUIDE.map((group, idx) => (
              <section
                key={idx}
                className={`rounded-2xl p-5 sm:p-6 border-2 shadow-sm ${group.color}`}
              >
                <h3 className={`${fontConfig.sectionTitle} font-black mb-4`}>
                  {group.category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white text-stone-900 p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <span
                          className={`inline-block font-extrabold text-xs sm:text-sm px-3 py-1 rounded-full mb-2.5 ${group.badgeColor}`}
                        >
                          {item.tag}
                        </span>
                        <h4 className="font-black text-xl sm:text-2xl text-stone-900 mb-2">
                          {item.title}
                        </h4>
                        <p className={`${fontConfig.subText} text-stone-700 font-medium mb-4`}>
                          {item.desc}
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-stone-900 font-bold text-sm sm:text-base">
                        {item.seniorTip}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ------------------------------------------
            分頁 4：🧰 手指日語＆實用工具 (Tools & Checklist)
        ------------------------------------------ */}
        {activeTab === 'tools' && (
          <div className="space-y-8">
            {/* 區塊 A：長輩大字手指日語卡 */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-400 shadow-md">
              <div className="mb-5">
                <h2 className={`${fontConfig.sectionTitle} font-black text-emerald-950 mb-1`}>
                  🗣️ 長輩手指日語大字卡（點一下即可全螢幕放大＋發音）
                </h2>
                <p className={`${fontConfig.subText} text-stone-700 font-bold`}>
                  在日本餐廳點餐、找洗手間或買東西時，不必緊張！直接點選下方卡片拿給日本店員看即可：
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {JAPANESE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="bg-emerald-50/60 hover:bg-emerald-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300 flex flex-col justify-between transition-all shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="bg-emerald-800 text-white text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full">
                          {card.category}
                        </span>
                        <span className="text-2xl sm:text-3xl">{card.icon}</span>
                      </div>

                      <div className="font-black text-xl sm:text-2xl text-stone-900 mb-2">
                        {card.zh}
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-emerald-200 mb-2">
                        <div className="font-black text-xl sm:text-2xl text-emerald-950 leading-snug">
                          {card.ja}
                        </div>
                        <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                          發音參考：{card.romaji}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 font-bold mb-4">
                        {card.subText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          setSelectedModalData(card);
                          setModalType('japanese');
                        }}
                        className="flex-1 bg-red-800 hover:bg-red-900 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Maximize2 className="w-5 h-5" />
                        <span>全螢幕放大給店員看</span>
                      </button>

                      <button
                        onClick={() => speakJapanese(card.ja, card.id)}
                        className={`py-3 px-4 rounded-xl font-extrabold border-2 flex items-center justify-center gap-1.5 ${
                          speakingId === card.id
                            ? 'bg-amber-500 text-stone-950 border-amber-700'
                            : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                        }`}
                        title="播放日語發音"
                      >
                        <Volume2 className="w-5 h-5" />
                        <span>發音</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 區塊 B：互動式行李檢查表 */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-400 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <h2 className={`${fontConfig.sectionTitle} font-black text-stone-900`}>
                    🧳 出發前行李準備檢查表（直接點擊打勾）
                  </h2>
                  <p className={`${fontConfig.subText} text-stone-600 font-bold`}>
                    您的勾選紀錄會自動保存在這支手機中，整理行李不怕漏帶！
                  </p>
                </div>
                <div className="bg-amber-100 text-amber-950 font-black px-4 py-2 rounded-xl border border-amber-400">
                  已準備：{completedCount} / {checklist.length} 項
                </div>
              </div>

              <div className="space-y-2.5">
                {checklist.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleCheckItem(c.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                      c.checked
                        ? 'bg-emerald-50/80 border-emerald-400 text-stone-500'
                        : 'bg-stone-50 hover:bg-amber-50/50 border-stone-300 text-stone-900'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {c.checked ? (
                        <CheckSquare className="w-7 h-7 text-emerald-700" />
                      ) : (
                        <Square className="w-7 h-7 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs font-extrabold px-2.5 py-0.5 rounded bg-stone-200 text-stone-700 mb-1">
                        {c.category}
                      </span>
                      <div
                        className={`font-extrabold ${fontConfig.baseText} ${
                          c.checked ? 'line-through text-stone-500' : 'text-stone-900'
                        }`}
                      >
                        {c.item}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* ==========================================
          底部常駐緊急聯絡與快速導覽列 (長輩安心保障)
      ========================================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFDF9] border-t-2 border-amber-300 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              setSelectedModalData(tripData.hotels[0]);
              setModalType('hotel');
            }}
            className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold py-2.5 px-3 rounded-xl border border-amber-400 flex items-center justify-center gap-1.5 text-sm sm:text-base"
          >
            <span>🚕</span>
            <span>飯店給司機看</span>
          </button>

          <button
            onClick={() => setModalType('emergency')}
            className="flex-1 bg-red-800 hover:bg-red-900 text-white font-extrabold py-2.5 px-3 rounded-xl shadow flex items-center justify-center gap-1.5 text-sm sm:text-base"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>緊急聯絡＆手指日語</span>
          </button>
        </div>
      </footer>

      {/* ==========================================
          全螢幕彈出視窗 1：飯店地址給計程車司機看
      ========================================== */}
      {modalType === 'hotel' && selectedModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-amber-400 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-stone-200">
              <span className="bg-amber-500 text-stone-950 font-black px-4 py-1.5 rounded-full text-base sm:text-lg">
                🚕 給日本計程車司機 / 警察看
              </span>
              <button
                onClick={() => setModalType(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-extrabold px-4 py-2 rounded-xl flex items-center gap-1"
              >
                <X className="w-6 h-6" />
                <span>關閉</span>
              </button>
            </div>

            <div className="space-y-5 text-left">
              <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-300">
                <div className="text-sm sm:text-base font-extrabold text-amber-900 mb-1">
                  運転手さん、このホテルまでお願いします：
                </div>
                <div className="text-2xl sm:text-4xl font-black text-stone-950 leading-snug mb-4">
                  {selectedModalData.nameJa}
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-red-900 leading-relaxed select-all">
                  {selectedModalData.addressJa}
                </div>
                <div className="text-lg sm:text-xl font-bold text-stone-700 mt-3">
                  TEL: {selectedModalData.phone}
                </div>
              </div>

              <div className="bg-stone-100 p-4 rounded-xl text-stone-800">
                <div className="font-extrabold">中文對照：{selectedModalData.nameZh}</div>
                <div className="text-sm sm:text-base mt-1">{selectedModalData.addressZh}</div>
              </div>

              {/* 切換不同飯店按鈕 */}
              {tripData.hotels.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tripData.hotels.map((h, i) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedModalData(h)}
                      className={`px-3.5 py-2 rounded-xl font-bold text-sm border ${
                        selectedModalData.id === h.id
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      切換飯店 {i + 1}：{h.nameZh.slice(0, 10)}...
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setModalType(null)}
                className="w-full bg-red-800 hover:bg-red-900 text-white font-black text-xl py-4 rounded-2xl shadow-md"
              >
                關閉放大字卡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          全螢幕彈出視窗 2：手指日語單張超大字卡
      ========================================== */}
      {modalType === 'japanese' && selectedModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-emerald-500 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-stone-200">
              <span className="bg-emerald-700 text-white font-black px-4 py-1.5 rounded-full text-base sm:text-lg">
                🗣️ 請將此畫面拿給日本店員看
              </span>
              <button
                onClick={() => setModalType(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-extrabold px-4 py-2 rounded-xl flex items-center gap-1"
              >
                <X className="w-6 h-6" />
                <span>關閉</span>
              </button>
            </div>

            <div className="text-center py-6 px-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 mb-5">
              <div className="text-5xl mb-4">{selectedModalData.icon}</div>
              <div className="text-3xl sm:text-5xl font-black text-stone-950 leading-snug mb-4">
                {selectedModalData.ja}
              </div>
              <div className="text-lg sm:text-xl font-bold text-emerald-900">
                ({selectedModalData.romaji})
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-xl sm:text-2xl font-extrabold text-stone-800">
                中文意思：{selectedModalData.zh}
              </div>
              <div className="text-stone-600 font-medium mt-1">{selectedModalData.subText}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => speakJapanese(selectedModalData.ja, selectedModalData.id)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xl py-4 rounded-2xl flex items-center justify-center gap-2 shadow"
              >
                <Volume2 className="w-6 h-6" />
                <span>點我播放日語發音</span>
              </button>
              <button
                onClick={() => setModalType(null)}
                className="flex-1 bg-stone-800 hover:bg-stone-900 text-white font-black text-xl py-4 rounded-2xl"
              >
                關閉字卡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          全螢幕彈出視窗 3：緊急聯絡人與常用手指日語快選
      ========================================== */}
      {modalType === 'emergency' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 border-4 border-red-700 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-stone-200">
              <h3 className="text-xl sm:text-2xl font-black text-red-900 flex items-center gap-2">
                <ShieldAlert className="w-7 h-7 text-red-700" />
                <span>緊急聯絡電話 ＆ 常用手指日語</span>
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1"
              >
                <X className="w-6 h-6" />
                <span>關閉</span>
              </button>
            </div>

            {/* 家族聯絡人 */}
            <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-200 mb-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-red-950 text-lg">📞 家族聯絡人（點擊直接撥號）</span>
                <button
                  onClick={() => setModalType('edit')}
                  className="text-xs sm:text-sm font-bold text-red-800 underline"
                >
                  修改電話
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${tripData.contacts.leaderPhone}`}
                  className="bg-white p-3.5 rounded-xl border border-red-300 flex items-center justify-between hover:bg-amber-50"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-500">主聯絡人</div>
                    <div className="font-black text-stone-900">{tripData.contacts.leaderName}</div>
                    <div className="font-extrabold text-red-800 text-lg">
                      {tripData.contacts.leaderPhone}
                    </div>
                  </div>
                  <span className="bg-red-800 text-white p-2.5 rounded-full">
                    <Phone className="w-5 h-5" />
                  </span>
                </a>

                <a
                  href={`tel:${tripData.contacts.secondPhone}`}
                  className="bg-white p-3.5 rounded-xl border border-red-300 flex items-center justify-between hover:bg-amber-50"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-500">備用聯絡人</div>
                    <div className="font-black text-stone-900">{tripData.contacts.secondName}</div>
                    <div className="font-extrabold text-red-800 text-lg">
                      {tripData.contacts.secondPhone}
                    </div>
                  </div>
                  <span className="bg-red-800 text-white p-2.5 rounded-full">
                    <Phone className="w-5 h-5" />
                  </span>
                </a>
              </div>

              <div className="text-sm font-bold text-stone-700 pt-1">
                <div>🇯🇵 日本報警/救護：{tripData.contacts.japanEmergency}</div>
                <div>🇹🇼 駐大阪辦事處急難救助：{tripData.contacts.taiwanRepEmergency}</div>
              </div>
            </div>

            {/* 快速點選手指日語 */}
            <div className="mb-4">
              <div className="font-extrabold text-stone-900 text-lg mb-2.5">
                👇 點選下方句子，立即放大給日本人看：
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {JAPANESE_CARDS.slice(0, 6).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedModalData(c);
                      setModalType('japanese');
                    }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-left p-3.5 rounded-xl border-2 border-emerald-300 flex items-center gap-3"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <div className="font-black text-stone-900">{c.zh}</div>
                      <div className="text-xs font-bold text-emerald-900">{c.ja}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setModalType(null)}
              className="w-full bg-stone-800 hover:bg-stone-900 text-white font-black text-lg py-3.5 rounded-2xl"
            >
              關閉視窗
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          全螢幕彈出視窗 4：主辦人自訂編輯器 (Edit Mode)
      ========================================== */}
      {modalType === 'edit' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 border-4 border-amber-500 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-stone-200">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-amber-700" />
                <span>自訂修改旅遊資訊（自動儲存）</span>
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1"
              >
                <X className="w-6 h-6" />
                <span>完成並關閉</span>
              </button>
            </div>

            <div className="space-y-5 text-base">
              {/* 編輯聯絡人 */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-3">
                <h4 className="font-black text-red-900">1. 修改家族總召與緊急聯絡電話</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">
                      主聯絡人姓名
                    </label>
                    <input
                      type="text"
                      value={tripData.contacts.leaderName}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          contacts: { ...prev.contacts, leaderName: e.target.value }
                        }))
                      }
                      className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">
                      主聯絡人電話
                    </label>
                    <input
                      type="text"
                      value={tripData.contacts.leaderPhone}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          contacts: { ...prev.contacts, leaderPhone: e.target.value }
                        }))
                      }
                      className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* 編輯主要飯店 */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-3">
                <h4 className="font-black text-amber-900">
                  2. 修改住宿飯店名稱與日文地址（用於計程車大字卡）
                </h4>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    飯店中文名稱
                  </label>
                  <input
                    type="text"
                    value={tripData.hotels[0].nameZh}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTripData((prev) => {
                        const updated = [...prev.hotels];
                        updated[0] = { ...updated[0], nameZh: val };
                        return { ...prev, hotels: updated };
                      });
                    }}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    飯店日文名稱（給司機看）
                  </label>
                  <input
                    type="text"
                    value={tripData.hotels[0].nameJa}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTripData((prev) => {
                        const updated = [...prev.hotels];
                        updated[0] = { ...updated[0], nameJa: val };
                        return { ...prev, hotels: updated };
                      });
                    }}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    飯店日文地址
                  </label>
                  <input
                    type="text"
                    value={tripData.hotels[0].addressJa}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTripData((prev) => {
                        const updated = [...prev.hotels];
                        updated[0] = { ...updated[0], addressJa: val };
                        return { ...prev, hotels: updated };
                      });
                    }}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                  />
                </div>
              </div>

              {/* 編輯航班時間 */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-3">
                <h4 className="font-black text-sky-900">3. 修改星宇航空班機號碼與集合時間</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">
                      去程 (11/26) 班機與出發時間
                    </label>
                    <input
                      type="text"
                      value={tripData.flights.outbound.depTime}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          flights: {
                            ...prev.flights,
                            outbound: { ...prev.flights.outbound, depTime: e.target.value }
                          }
                        }))
                      }
                      className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">
                      回程 (12/01) 班機與出發時間
                    </label>
                    <input
                      type="text"
                      value={tripData.flights.inbound.depTime}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          flights: {
                            ...prev.flights,
                            inbound: { ...prev.flights.inbound, depTime: e.target.value }
                          }
                        }))
                      }
                      className="w-full p-2.5 rounded-lg border border-stone-300 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* 恢復預設值區塊 */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="text-sm font-bold text-stone-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>恢復網站初始預設資料</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl border border-red-300">
                    <span className="text-sm font-bold text-red-900">確定要還原預設值嗎？</span>
                    <button
                      onClick={handleResetDefault}
                      className="bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      確定還原
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      取消
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setModalType(null)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-6 py-3 rounded-xl shadow flex items-center gap-2 ml-auto"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>儲存並返回行程</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}