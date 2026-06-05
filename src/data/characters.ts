/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DreamCharacter } from '../types';

// Let's define the 9 categories and their descriptions to structure the data nicely
export interface CategoryMeta {
  id: string;
  name: string;
  lotusName: string;
  themeColor: string;
  description: string;
}

export const DREAM_CATEGORIES: CategoryMeta[] = [
  {
    id: 'health',
    name: '医疗与健康',
    lotusName: '白雪公主莲',
    themeColor: '#4f83b1', // Pure slate sky-blue represent health & clarity
    description: '疗愈身心，给尘世生命以最温柔的温润与守护。'
  },
  {
    id: 'education',
    name: '教育与科研',
    lotusName: '青莲',
    themeColor: '#2d785a', // Green representative of wisdom growth
    description: '启明心智，在无垠真理境界中格物探索寻光。'
  },
  {
    id: 'art',
    name: '艺术与设计',
    lotusName: '粉舞妃莲',
    themeColor: '#db5c93', // Delicate pink represent beautiful color forms
    description: '创造美学，将心中的灵感、音律与百态凝成画章。'
  },
  {
    id: 'business',
    name: '商业与法律',
    lotusName: '秣陵秋色莲',
    themeColor: '#ca9e5a', // Gold clay represent autumn wealth & justice weight
    description: '运筹纬度，在人世运转中主持公道与商行巨轮。'
  },
  {
    id: 'tech',
    name: '技术与工程',
    lotusName: '蓝渊莲',
    themeColor: '#1b4f8f', // Indigo blue represent technological system power
    description: '神工巧思，用严谨智识铺就未来新纪元的基石。'
  },
  {
    id: 'service',
    name: '生活服务',
    lotusName: '杏色春杉莲',
    themeColor: '#db5c33', // Warm apricot orange represent smoke fires & help
    description: '热忱奉献，于平凡点滴中连结温暖人心的烟火。'
  },
  {
    id: 'transport',
    name: '交通物流',
    lotusName: '银翼莲',
    themeColor: '#64748b', // Slate silver represent long miles flying wings
    description: '日夜兼程，用穿梭印记消弭天堑阻绝，连接山海。'
  },
  {
    id: 'agriculture',
    name: '农业自然',
    lotusName: '红千叶莲',
    themeColor: '#a33512', // Rich ochre red earth representative of fruits
    description: '躬耕生机，深情守望长川森林与大地的慷慨馈赠。'
  },
  {
    id: 'media',
    name: '媒体传播',
    lotusName: '娇容三变莲',
    themeColor: '#9333ea', // Changing violet represent fast dynamic voices
    description: '探查微光，记录真实时代并传递最真挚的共鸣。'
  }
];

export const DREAM_CHARACTERS: DreamCharacter[] = [
  // ================= 1. 医疗与健康 (6) =================
  {
    id: 'doctor',
    name: '医生花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '医心仁术，守护健康防线',
    description: '你立志成为生命健康的无畏守护者。用冷静克制的专业判断和仁心妙手，化解每个因疾痛陷入泥沼的无助黑夜，在生命的微光里撑起一片晴空，让笑容和安康重返千万个幸福家园。',
    color: '#4f83b1',
    svgType: 'doctor',
    imgCode: 'GBtVS0Fn'
  },
  {
    id: 'nurse',
    name: '护士花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '春风化雨，给予悉心温柔照拂',
    description: '伟大的力量常融汇于最体贴和耐心的聆取。你立志守望着万千康复的前线，将细致而持久的温暖注入平凡的工作。拂去烦忧，抚慰伤创，用温存的烛光照耀人间健康康复之路。',
    color: '#4f83b1',
    svgType: 'nurse',
    imgCode: 'bZ8m4Xj7'
  },
  {
    id: 'dentist',
    name: '牙医花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '明齿粲然，绽放自信美丽笑颜',
    description: '你专注在方寸呼吸间调理生活的细节。立志成为护卫微笑的精细匠人，重整明齿、修复欢颜。用最科学微创的手艺，为不同年纪的主角擦去隐忧痛楚，让他们肆无忌惮地笑迎未来。',
    color: '#4f83b1',
    svgType: 'doctor',
    imgCode: 'gxmPsBtZ'
  },
  {
    id: 'vet',
    name: '兽医花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '同理慈爱，安抚无言的可爱生灵',
    description: '无言的伴侣也拥有世上最纯粹的爱。你立志成为倾听宠灵叫声与痛苦的自然同行者，用无私温柔医治生灵、保护脆弱。在轻抚和科学诊治中，搭起人类与萌宠灵动和谐的共生桥梁。',
    color: '#4f83b1',
    svgType: 'vet',
    imgCode: 'KkvzW89v'
  },
  {
    id: 'nutritionist',
    name: '营养师花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '调和五味，塑造元气健康体魄',
    description: '身体是能量的载体，膳食则是生命的源火。你立志从天然谷麦与果蔬微量元素中提取活化的秘密，用最优配比滋养大众，调配活力满满的膳食方案，从根本上激活每个人生活的盎然生机。',
    color: '#4f83b1',
    svgType: 'chef',
    imgCode: 'Y4vDz67j'
  },
  {
    id: 'counselor',
    name: '心理咨询师花',
    modernRole: '医疗与健康 · 白雪公主莲瓣',
    concept: '无垠心海，指引清幽方向',
    description: '当情绪的尘埃遮蔽前行视野，你立志成为点亮心灵灯塔的引路使者。倾听、接纳、解析。在一场场心与心的轻柔触碰里，抚平焦躁和迷茫，引导受伤的心灵找到自我疗愈和宁静的出口。',
    color: '#4f83b1',
    svgType: 'nurse',
    imgCode: 'Vrp8Ff2P'
  },

  // ================= 2. 教育与科研 (8) =================
  {
    id: 'chemist',
    name: '化学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '原子变奏，缔造未知新质材料',
    description: '你是操持分子魔术、连接过去与未来的造物先锋。立志在试剂反应、元素拼凑与重组里合成对大众有莫大裨益的先进材料或药物，用千回百转的微观奇迹拓展生活品质与制造业的高度。',
    color: '#2d785a',
    svgType: 'scientist',
    imgCode: 'ZvpLDHsk'
  },
  {
    id: 'teacher',
    name: '教师花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '桃李春风，点亮漫漫成长灯烛',
    description: '生命最大的传承是智慧与品德的延续。你立志耕耘在讲台之上，用耐心的言语播下求知的心愿之种。引导稚嫩羽翼历练强健，目送着他们振翅飞向无边广阔的无限前程，薪火相传。',
    color: '#2d785a',
    svgType: 'scientist',
    imgCode: '0z2pp9vP'
  },
  {
    id: 'scientist',
    name: '科学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '打破壁垒，在逻辑中追求真知',
    description: '在无知与迷惘的前线，你立志成为探求普适真理的孤舟灯火。不惧未知和瓶颈，在浩繁文献与无数次实验中剥离谬误，以不懈之疑问与实证精神为人类文明开拓认知疆土，创造繁荣。',
    color: '#2d785a',
    svgType: 'scientist',
    imgCode: 'YG145Pk7'
  },
  {
    id: 'astronomer',
    name: '天文学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '仰守星辰，记录璀璨宇宙宏图',
    description: '浩瀚夜空是写在时间背后的最美神话。你立志终日与浩大夜色相伴，通过光学镜头和光谱电波洞穿千百万次宇宙回响，聆听恒星在生命尽头的绝唱，帮地球过客解密我们在宏伟太空的家园定位。',
    color: '#2d785a',
    svgType: 'scientist',
    imgCode: 'kVwMWdnC'
  },
  {
    id: 'biologist',
    name: '生物学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '双螺旋线，解译无穷细胞演化',
    description: '从深海极端微生物到飞跃九天的猎鹰，生命的律动奇妙异常。你立志破译这股自然伟力的基因天书，揭秘生态系统交错生存的可贵平衡，带给人类尊重和谐、反哺大自然的智慧视野。',
    color: '#2d785a',
    svgType: 'vet',
    imgCode: '06vrpfDL'
  },
  {
    id: 'explorer',
    name: '探险家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '搜罗万境，勇攀未知无边险域',
    description: '世上最迷人的秘辛常藏在常人难以企及之境。你立志背起行囊、手持罗盘与探险镐，深入大漠冰川、探秘无底深渊与古树密林，克服千万般寂寞与险阻，为人类带回关于世界的未知讯息。',
    color: '#2d785a',
    svgType: 'pilot',
    imgCode: '3dDwV6ZF'
  },
  {
    id: 'archaeologist',
    name: '考古学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '发掘沉沙，复原千百载历史厚度',
    description: '历史是一本合上的巨著，你立志用最纯熟仔细的动作，在沙土岩壁和精美器物中发掘消逝时光的面纱，重读古老文明的无价记忆，让每一座历史废址与风化艺术重新在现代发声、震撼人心。',
    color: '#2d785a',
    svgType: 'engineer',
    imgCode: '18jNw6M2'
  },
  {
    id: 'geographer',
    name: '地理学家花',
    modernRole: '教育与科研 · 青莲莲瓣',
    concept: '丈量八极，描绘大地错落纹理',
    description: '板块山岳、江海大川，全是岁月在这颗星球表面镂刻下的神迹。你立志穷极一生踏遍险境丘壑，描绘水文地质与季候演变的壮阔地图，为人类寻得与多变地表和谐共融的最优家园答卷。',
    color: '#2d785a',
    svgType: 'pilot',
    imgCode: '06v1tXtk'
  },

  // ================= 3. 艺术与设计 (10) =================
  {
    id: 'painter',
    name: '画家花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '彩绘江山，在画布中写意不凡',
    description: '万般意象因眼界而灵动，一抹朱砂、两滴粉青。你立志用画笔和斑斓颜料在空无中构件壮美天地、复现敦煌极乐世界与现代都市的精巧交融，将无形的人生哲理化作驻留永久的视觉震撼。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: 'yWZnd66W'
  },
  {
    id: 'musician',
    name: '音乐家花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '音阶流动，编纂心跳频率乐章',
    description: '声音是绕过理智直抵灵魂的心香。你立志在五音律动、琴瑟和鸣中勾摹心绪，将喜怒哀乐谱成穿越时间的交响和谣曲，洗尽众生心底疲态尘念，让乐音充盈广袤天地和梦海航程。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: 'y3mbS7Hj'
  },
  {
    id: 'dancer',
    name: '舞蹈家花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '飞燕凌空，身行合一展露灵感',
    description: '身体是抒发精神的最佳容器。你立志在空中腾跃、旋舞中复刻高古飞天的灵妙曲线。用每一个柔美到极致、求精如风的肢体表达，阐释生命的执着、自由与最浪漫的梦境寄托。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: '9rTWJ9Wv'
  },
  {
    id: 'actor',
    name: '演员花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '瞬息百态，体验别样精彩人生',
    description: '戏里乾坤，戏外人生。你立志将自我的身体与情感真切借予不同的戏剧主角，或悲、或喜、或忧。在千万次排演与专注对视里倾情呈现大众百态，折射人心良善与坚忍高尚。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: 'nswbHVFv'
  },
  {
    id: 'singer',
    name: '歌手花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '天籁清歌，用唱腔穿透虚空迷障',
    description: '只要歌声响起，孤寂的前路就不再清冷。你立志用最诚挚磁性的嗓音，诉说故事，传递深情，跨越经纬地理距离将世界共振，令伤怀者得到慰藉，令寻梦者满怀披荆前行的豪迈力气。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: 'hXqYgz9F'
  },
  {
    id: 'photographer',
    name: '摄影师花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '凝固光影，在刹那中驻存无价永恒',
    description: '时光如飞流般逝去，唯有镜头能攫取最真切的瞬息。你立志寻影在街角深林和苍茫原野中，捕捉孩童清澈微笑、落日跌落山峦的无华时刻，用黑白色彩和精巧构图锁住最浓烈的回忆和触动。',
    color: '#db5c93',
    svgType: 'engineer',
    imgCode: 'w7S1BHv8'
  },
  {
    id: 'designer',
    name: '设计师花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '别出心裁，重组极致极简美学',
    description: '美不仅仅是装饰，更是生活的骨骼。你立志在字体、空间与线面中寻找和谐，用天马行空的巧思与理性构架结合，让每一个日常物件也承载生活的雅致品味，点石成金。',
    color: '#db5c93',
    svgType: 'engineer',
    imgCode: 'jLWWKCR2'
  },
  {
    id: 'architect',
    name: '建筑师花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '平地平梁，架设诗意栖息宫殿',
    description: '建筑是凝固的交响，亦是守护人烟的安全屏障。你立志把想象中的空中花园落地成为融合自然与坚固理性的永恒地标，雕刻每一寸光影在砖石木构上的驻留，让安居乐业绽开最美花蕾。',
    color: '#db5c93',
    svgType: 'engineer',
    imgCode: 'LgKtff4S'
  },
  {
    id: 'writer',
    name: '作家花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '纵横文字，在笔墨下点染千秋万世',
    description: '白纸黑字间，蕴藏着洞穿时代、直抵荒古的精神力量。你立志倾注长夜思考，用灵动细腻的笔触勾勒英雄的长卷和温柔的小说，在大众脑海和心中塑造一片属于思想和感动的心田飞地。',
    color: '#db5c93',
    svgType: 'singer',
    imgCode: 'tYRKVVs7'
  },
  {
    id: 'esports',
    name: '电竞选手花',
    modernRole: '艺术与设计 · 粉舞妃莲瓣',
    concept: '指控合一，在虚拟战局克敌制胜',
    description: '指尖搏击，亦是勇气的角逐和智慧的弈战。你立志在电子沙场与队友携手并肩，克服千万次极速战局、瞬息计算万般博弈。在坚韧不辍的极速训练中，在无数人喝彩里捧起金杯，竞逐不灭巅峰。',
    color: '#db5c93',
    svgType: 'engineer',
    imgCode: 'NLFqPHxH'
  },

  // ================= 4. 商业与法律 (7) =================
  {
    id: 'lawyer',
    name: '律师花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '口含公道，在辩陈中维护正义公正',
    description: '律法严明方显人世清平，辩词锋厉能定尘土喧豗。你立志在严谨周密、字句推敲中筑起抗击冤屈与失衡的防火墙，为每个弱小和需要的人发声、坚毅地捍卫不容玷染的清净公平尊严。',
    color: '#ca9e5a',
    svgType: 'doctor',
    imgCode: 't16tg2y8'
  },
  {
    id: 'judge',
    name: '法官花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '明镜高悬，用无私理法平析人间纷杂',
    description: '天平端平是人心最后的皈依。你立志秉承最纯粹冷静的克己原则、扫除一切外在名利裹挟，在一场场庄严宣判中，抽丝剥茧断决情仇账单，彰显永恒的公正，让浊世喧沸化作玉开的清宁。',
    color: '#ca9e5a',
    svgType: 'doctor',
    imgCode: 'sBsbPQXw'
  },
  {
    id: 'police',
    name: '警察花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '安民解危，于每个街道中巡迹值守',
    description: '黑暗所至，更需热忱英勇无怨地迎光向前。你立志披上正气的蓝色制服，巡视在城市治安和黎明哨卡，把大众生命的托付视为最尊严重诺的心愿，默默抗下狂风巨澜，守望万家安眠。',
    color: '#ca9e5a',
    svgType: 'pilot',
    imgCode: '0z2pp9vP'
  },
  {
    id: 'firefighter',
    name: '消防员花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '披坚破火，在烟雾险境中逆行前锋',
    description: '警笛拉响，便是你向险自驱、无悔奔袭的冲锋军号。你立志在滔滔火焰和救灾最危险的一线播撒清凉的生机之水，无所畏惧，从废墟烟里抱起脆弱呼救，用青春书写生命的无畏篇章。',
    color: '#ca9e5a',
    svgType: 'pilot',
    imgCode: 'nsdZCYkj'
  },
  {
    id: 'entrepreneur',
    name: '企业家花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '破浪搏风，在商海浪潮中合众创新',
    description: '每一次社会经济的开拓都始于坚毅果敢的开拓。你立志带领优秀的队伍，调配各方资源、解决痛点需求，在大风大浪和变动激荡的世界竞争中，将创意聚变落地，用丰盈机遇造福千家万众。',
    color: '#ca9e5a',
    svgType: 'engineer',
    imgCode: '23Sbc2Mf'
  },
  {
    id: 'banker',
    name: '银行家花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '信诺万千，疏导大众资金奔涌不竭',
    description: '资金是实体产业 and 民生奔涌的动力甘泉。你立志在数字和宏观分析中科学驾驭金融罗盘，为中小创客和伟大基建倾倒关键援助，实现融通，让死气沉沉的社会要素在新金融网络中勃然爆发。',
    color: '#ca9e5a',
    svgType: 'engineer',
    imgCode: '56JGWQB3'
  },
  {
    id: 'accountant',
    name: '会计师花',
    modernRole: '商业与法律 · 秣陵秋色莲瓣',
    concept: '精益毫厘，在报表和平衡中梳理清澈',
    description: '收支相平，方能长享健康不枯。你立志像手持算筹的古老账司，在纷繁支出的乱麻线条里寻找精确的定位，将模糊错漏化归平顺，让团队在清晰健康的财务跑道上踏实壮大。',
    color: '#ca9e5a',
    svgType: 'engineer',
    imgCode: 'tsXz2hhL'
  },

  // ================= 5. 技术与工程 (6) =================
  {
    id: 'engineer',
    name: '工程师花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '天工开物，驾驭枢机改变人居山河',
    description: '重工之器，能让天堑变通途。你立志和钢铁、设计矩尺、数字孪生打交道，筑造架海长桥、垒起破天高楼。将科幻场景转变成触手可及的宏大建筑和智能重型设施，用智慧和双手重塑山河。',
    color: '#1b4f8f',
    svgType: 'engineer',
    imgCode: 'Y4ryG5nm'
  },
  {
    id: 'programmer',
    name: '程序员花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '数字寰宇，编写无形逻辑通幽世界',
    description: '用最底层、纯粹的代码逻辑编织虚空，能构筑一个改变亿万网民习惯的数字化时代。你立志在幽静长夜里敲击出优雅精湛的框架，做连通万物的架构，让算力火种普惠人类知识和生机便利。',
    color: '#1b4f8f',
    svgType: 'engineer',
    imgCode: 'vDsxrGLD'
  },
  {
    id: 'astronaut',
    name: '宇航员花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '搏击千峰，御凌九霄拥抱苍穹深蓝',
    description: '离开温热的母星，在星河流淌的黑夜里播下地球种群寻索的踪痕。你立志承受极度艰苦的隔离和模拟培训，心怀最澎湃、不畏生死的开拓壮志，走向万千航天开拓的无声星潮中。',
    color: '#1b4f8f',
    svgType: 'pilot',
    imgCode: 'GTxXmzPr'
  },
  {
    id: 'mechanic',
    name: '汽车维修师花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '神针妙诊，精准调理机车骨骼中枢',
    description: '每个冰冷的零部件、转动活塞都有它的独特脾气。你立志练就一副只凭引擎嗡鸣和尾烟颜色就能准确揪出安全病灶的神眼，用妙手重拼汽车中枢，令承载远方期待的机械轮轨一路畅行无阻。',
    color: '#1b4f8f',
    svgType: 'engineer',
    imgCode: '2LLzpbn1'
  },
  {
    id: 'athlete',
    name: '运动员花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '突破自我，用血肉极限奔赴梦想顶峰',
    description: '身体就是你最好的盾与剑。在千百遍枯燥刻苦、疼痛叠加的极限操练里，你立志磨砺金石般强健的体魄与永不屈服的求胜意志。在竞技赛台上全力搏金，向人类肉体和执着的极限致敬。',
    color: '#1b4f8f',
    svgType: 'farmer',
    imgCode: 'zbm7w4pP'
  },
  {
    id: 'magician',
    name: '魔术师花',
    modernRole: '技术与工程 · 蓝渊莲瓣',
    concept: '奇幻莫测，在转瞬变轨中带来惊喜震撼',
    description: '打破感官日常，让不可能的光影、事物在眼前奇迹发生。你立志在千万次台下苦练里修炼至臻化境、手脑合一。用令人惊眩的玄妙魔术洗落观者的生活庸常，将返璞归真之童心和欢呼还给世间。',
    color: '#1b4f8f',
    svgType: 'singer',
    imgCode: 'XG3FYWsn'
  },

  // ================= 6. 生活服务 (6) =================
  {
    id: 'chef',
    name: '厨师花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '美味相传，一餐一饭治愈风尘客旅',
    description: '最质朴、踏实和浓热的关怀，就写在温热的菜品和清幽的水火烹调中。你立志用心做最温暖脾胃的美食艺术家，精研技艺，用食物的香气将世俗的坚硬疲倦融化在每一口饱腹的安心时刻。',
    color: '#db5c33',
    svgType: 'chef',
    imgCode: 'PCpqG7zV'
  },
  {
    id: 'baker',
    name: '烘焙师花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '甜蜜流布，用烘烤面包温熏香甜街区',
    description: '麦粉在高温酵母里膨胀、散发出带着奶香的融融金黄色。你立志静候在烘箱前、揉制最具手掌温度的美丽软点，给每个踏入小店的都市客，奉上世间最直接、醇正的童话般甜蜜与治愈。',
    color: '#db5c33',
    svgType: 'chef',
    imgCode: 'vcSWLpZX'
  },
  {
    id: 'hairdresser',
    name: '理发师花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '巧手剪影，让秀发焕发光彩与自信',
    description: '三千发丝一拂而新，梳理秀发犹如整理生活的新始章。你立志精巧手艺与审美品位结合，根据各种行者的面孔和梦想气质修剪最意气飞扬的姿仪神采，让他们英气盎然、潇洒大步跨向未来路。',
    color: '#db5c33',
    svgType: 'farmer',
    imgCode: 'Wh97YdXD'
  },
  {
    id: 'florist',
    name: '花艺师花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '调和满芬，用草木幽香妆饰枯燥岁月',
    description: '花草是写在大地表面的动人情诗。你立志成为摆弄芬芳、洞悟草本姿态的自然裁缝。巧手修枝、科学搭配，在精美捧花与浪漫园艺陈设里搭起一座让浮躁尘世深嗅自然芳菲的香气绿屿。',
    color: '#db5c33',
    svgType: 'farmer',
    imgCode: 'VSkDLjvt'
  },
  {
    id: 'courier',
    name: '快递员花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '穿街越城，风雨无阻地投递期许连接',
    description: '你是现代城市脉络中最勤勉、不可或缺的红血球细胞。穿梭烈日阴雨，立志按时平顺地把凝聚牵挂的各种载体包裹准确传递。在一声声诚挚的「到了」等问候里，默默勾连社会温馨生活。',
    color: '#db5c33',
    svgType: 'pilot',
    imgCode: 'hh1sxymZ'
  },
  {
    id: 'guide',
    name: '导游花',
    modernRole: '生活服务 · 杏色春杉莲瓣',
    concept: '指引神舟，在行者足下演绎山河璀璨',
    description: '山河大美，若无人解读则失却大半分灵性。你立志成为引经据典的名山解密者和引路领队，带领不同行者攀过云雾、穿过古镇，把浩如烟海的历史轶闻娓娓道来，书写充满激情的游记。',
    color: '#db5c33',
    svgType: 'pilot',
    imgCode: 'T516VytW'
  },

  // ================= 7. 交通物流 (4) =================
  {
    id: 'driver',
    name: '司机花',
    modernRole: '交通物流 · 银翼莲瓣',
    concept: '车轮滚滚，日夜安载跨越城市街巷',
    description: '车窗外流逝的是霓虹光带，双手握着的是一整车生命的重托。你立志平心静气在万里跑道和老旧窄巷中平顺穿梭，无论晨雾还是夜凉，都把每一颗心和每一个期待安全投递目的地。',
    color: '#64748b',
    svgType: 'pilot',
    imgCode: 'dkH1ccXN'
  },
  {
    id: 'captain',
    name: '船长花',
    modernRole: '交通物流 · 银翼莲瓣',
    concept: '扬帆破海，在万千重波里坚守航向方向',
    description: '大洋浩瀚风云多变，是专属于执掌者和勇士的试金石。你立志在深蓝罗盘指尖指引、机械柴油轰鸣声里，迎击暴风狂澜，保护跨国商货巨轮和千万吨希望，安然锚定繁绿的港湾，德迈沧海。',
    color: '#64748b',
    svgType: 'pilot',
    imgCode: 'DSX7pX7K'
  },
  {
    id: 'pilot_job',
    name: '飞行员花',
    modernRole: '交通物流 · 银翼莲瓣',
    concept: '搏击千霄，引领安全穿空云海经纬',
    description: '拨开层叠云雾，以最熟稔精准的操作让沉重羽翼在万米高空上优雅飞舞。你立志以精湛的航空心理与技术为矛，将天空险隘统统折平，联结遥远国度人们心心念念的团圆航程。',
    color: '#64748b',
    svgType: 'pilot',
    imgCode: 'GT8f3vMQ'
  },
  {
    id: 'steward',
    name: '空乘花',
    modernRole: '交通物流 · 银翼莲瓣',
    concept: '微笑相伴，万米客舱送去温情安稳',
    description: '颠簸重云、封闭旅舱，更需无微不至的细语和热饮。你立志用最亲切温婉、干练专业的态度守护空中长途安全，用热忱体贴祛除旅梦疲倦，让每个人感觉即便身在九天也有宾至如归的家园暖煦。',
    color: '#64748b',
    svgType: 'nurse',
    imgCode: 'fkN5VnVk'
  },

  // ================= 8. 农业自然 (4) =================
  {
    id: 'farmer_job',
    name: '农民花',
    modernRole: '农业自然 · 红千叶莲瓣',
    concept: '日照躬耕，饱满金谷德养人间大众',
    description: '每一粒米谷都是汗水滋养出的无价珍珠。你立志躬身田埂，春种秋收、敬畏自然、伺候农时，在大地金黄成熟交叠里收获果实。用坚韧长茧的手指支撑起家国最底气十足、最丰润的金色粮囤。',
    color: '#a33512',
    svgType: 'farmer',
    imgCode: 'xqfMr0k6'
  },
  {
    id: 'gardener',
    name: '园丁花',
    modernRole: '农业自然 · 红千叶莲瓣',
    concept: '春林初盛，精心培植满院万紫千红',
    description: '让荒野化作优雅的盆景植物，修剪每一条格调繁绿曲线。你立志与各种奇花异草相伴、懂其土层干湿和温度需求，用不急不躁的时间匠心打理园景，奉还城市行者一道最养眼的绿意幽谷。',
    color: '#a33512',
    svgType: 'farmer',
    imgCode: '9r1x38FC'
  },
  {
    id: 'zookeeper',
    name: '动物饲养员花',
    modernRole: '农业自然 · 红千叶莲瓣',
    concept: '万灵守护，在亲密互动中滋生灵动相恤',
    description: '不论是憨态可掬的熊猫，还是傲居树梢的鹦鹉，皆拥有独特的灵魂。你立志为这些不语的生态生灵营造安全快乐的栖所，细致调配辅食、爱拂守护，传递人类对地球其他伙伴的莫大温柔。',
    color: '#a33512',
    svgType: 'vet',
    imgCode: '5Xch0kWp'
  },
  {
    id: 'ranger',
    name: '护林员花',
    modernRole: '农业自然 · 红千叶莲瓣',
    concept: '守望苍翠，用寂寞林巡捍卫青山常在',
    description: '在无边的林海树梢前，一个人，一路巡逻，就是最坚毅的长城守护。你立志用脚板丈量绿色林野，排查火患、防范滥伐，在清寂的长空中见证一轮轮明月升落，用孤身长守捍卫绿洲长青。',
    color: '#a33512',
    svgType: 'farmer',
    imgCode: 'QV9YTkbf'
  },

  // ================= 9. 媒体传播 (3) =================
  {
    id: 'reporter',
    name: '记者花',
    modernRole: '媒体传播 · 娇容三变莲瓣',
    concept: '字含锋锐，不畏强险抵达新闻事实一线',
    description: '时代繁复浩渺，大浪之下，更需要事实的哨声响彻。你立志逆流而上奔袭在突发一线，在镜头与提问里还原真实的经纬。克服危象、不偏不易，在时代的空白墙壁上刻录下最惊醒、真诚的声音。',
    color: '#9333ea',
    svgType: 'scientist',
    imgCode: '3yNFHYfj'
  },
  {
    id: 'editor',
    name: '编辑花',
    modernRole: '媒体传播 · 娇容三变莲瓣',
    concept: '字里推敲，甘为作嫁衣镂刻极美笔调',
    description: '文字的力量重在打磨与点墨。你立志在专注文笔精益、细致审核中寻找最美的韵。在电脑屏幕前熬起漫长灯盏，推敲字里逻辑、提振核心情感。用默默无闻的伏案，为读者呈递最高品质的思想珍馐。',
    color: '#9333ea',
    svgType: 'engineer',
    imgCode: 'svKjZrK5'
  },
  {
    id: 'streamer',
    name: '主播花',
    modernRole: '媒体传播 · 娇容三变莲瓣',
    concept: '声频两端，用自信声色连结万里共鸣',
    description: '电波无形，却能将相隔万里的寂寞心跳拉扯一处。你立志守候在麦克风与直播镜头前，神采奕奕地讲述、风趣互动、解纷排忧。用极富感染力的真挚人格和自信语调，温暖每一个守在屏幕前的寻梦人。',
    color: '#9333ea',
    svgType: 'singer',
    imgCode: 'fksnDPZK'
  }
];
