// 文明核心区示意。起止为选定的历史时期而非文化、族群的绝对起源或终结。
const civilizations=[
 {name:'苏美尔城邦文明',start:-3200,end:-2004,lon:45.8,lat:31.5,rx:31,ry:21,detail:'两河流域南部的早期城市文明，以城邦和楔形文字等成就著称。显示的时间约为早期城邦至乌尔第三王朝结束。',source:'https://www.metmuseum.org/toah/ht/02/wam.html'},
 {name:'古埃及文明',start:-3100,end:-30,lon:31.3,lat:26.6,rx:24,ry:44,detail:'以尼罗河流域为核心，古代王朝、文字与宗教文化延续多个时期。此处以约前 3100 年至前 30 年作为展示区间。',source:'https://www.metmuseum.org/toah/ht/02/afe.html'},
 {name:'印度河成熟哈拉帕文明',start:-2600,end:-1900,lon:69.5,lat:28.2,rx:36,ry:36,detail:'印度河流域的成熟哈拉帕时期，以城市规划、手工业和贸易网络著称。结束年份仅标示这一考古分期，不表示当地人群消失。',source:'https://whc.unesco.org/en/tentativelists/1878/'},
 {name:'早期安第斯文明',start:-3000,end:-1800,lon:-77,lat:-10,rx:25,ry:34,detail:'以安第斯地区的卡拉尔等早期聚落为例。亮区是便于定位的核心区示意，不表示全部遗址或政治疆界。',source:'https://whc.unesco.org/en/list/1269/'},
 {name:'中华文明',start:-2070,end:2020,lon:110,lat:34,rx:67,ry:44,detail:'以黄河、长江流域等区域为重要起点，长期发展并与周边交流。光圈只帮助定位核心区域，并不表示历代王朝疆域。起点是本工作台的约略观察区间。',source:'https://whc.unesco.org/en/list/1114/'},
 {name:'巴比伦文明时期',start:-1894,end:-539,lon:44.4,lat:32.5,rx:30,ry:23,detail:'两河流域的巴比伦在古巴比伦和新巴比伦等不同时期发挥重要作用；这段时间内也存在其他政权，不能视为一条连续的王朝。',source:'https://www.metmuseum.org/toah/ht/04/wam.html'},
 {name:'奥尔梅克文明',start:-1500,end:-400,lon:-94.5,lat:18,rx:33,ry:23,detail:'中美洲早期重要文明之一，以墨西哥湾沿岸区域为核心。时间和光圈均为教学近似。',source:'https://artistproject.metmuseum.org/toah/ht/04/cam.html'},
 {name:'古印度文明',start:-1500,end:550,lon:79,lat:25,rx:62,ry:49,detail:'此处作为吠陀时代至笈多王朝时期南亚文化发展的概略展示；不代表南亚只有一种文化，也不等同于现代国家边界。',source:'https://www.metmuseum.org/toah/ht/04/ssa.html'},
 {name:'古希腊文明',start:-800,end:-146,lon:23.7,lat:38,rx:34,ry:24,detail:'以爱琴海周边的希腊城邦为核心，思想、艺术和政治制度影响广泛。前 146 年为本图选取的古希腊政治史观察节点，不代表文化在此后消失。',source:'https://artistproject.metmuseum.org/toah/ht/04/eusb.html'},
 {name:'古罗马文明',start:-753,end:476,lon:12.5,lat:42,rx:39,ry:29,detail:'以罗马城和意大利半岛为核心，先后经历共和国和帝国时期。西罗马帝国灭亡后，罗马传统仍在东罗马及后世延续。',source:'https://www.metmuseum.org/toah/ht/05/eust.html'},
 {name:'阿契美尼德波斯',start:-550,end:-330,lon:53,lat:32,rx:49,ry:35,detail:'此处专指古代阿契美尼德帝国时期的波斯，前 330 年标示该王朝的结束，不代表波斯文化结束。',source:'https://www.metmuseum.org/toah/hd/acha/hd_acha.htm'},
 {name:'东罗马与拜占庭文明',start:330,end:1453,lon:29,lat:41,rx:37,ry:28,detail:'以君士坦丁堡为重要中心，延续罗马政治传统并发展出拜占庭文化。',source:'https://www.metmuseum.org/toah/hd/byza/hd_byza.htm'},
 {name:'玛雅文明古典期',start:250,end:900,lon:-89.5,lat:17,rx:35,ry:26,detail:'玛雅文明的古典时期有众多城邦，文字、历法和建筑发达。玛雅文明和玛雅人并未在 900 年消失。',source:'https://www.metmuseum.org/toah/hd/maya/hd_maya.htm'},
 {name:'伊斯兰文明早期中心',start:622,end:1258,lon:43,lat:27,rx:52,ry:43,detail:'以阿拉伯半岛、西亚等地区为早期重要中心，文化和交流范围远超蓝色光圈。此处仅选取伊斯兰文明发展的早期时段。',source:'https://www.metmuseum.org/toah/hd/isla/hd_isla.htm'},
 {name:'吴哥文明',start:802,end:1431,lon:104,lat:13,rx:34,ry:25,detail:'以吴哥为重要中心，留下吴哥窟等建筑遗产。这是区域文明核心区而不是精确的王朝边界。',source:'https://whc.unesco.org/en/list/668/'},
 {name:'西非马里帝国时期',start:1235,end:1600,lon:-4,lat:14,rx:45,ry:28,detail:'马里帝国时期西非的贸易与文化交流十分活跃。展示时间为概略观察区间，范围并非疆界。',source:'https://artistproject.metmuseum.org/toah/ht/07/afu.html'},
 {name:'阿兹特克文明',start:1325,end:1521,lon:-99.1,lat:19.4,rx:28,ry:23,detail:'以特诺奇蒂特兰为中心的阿兹特克政权，1521 年首都陷落。中美洲原住民文化延续至今。',source:'https://www.metmuseum.org/essays/tenochtitlan'},
 {name:'印加帝国时期',start:1438,end:1533,lon:-72,lat:-13.5,rx:27,ry:38,detail:'以库斯科和安第斯地区为核心，形成庞大的道路与行政网络；结束年份选取西班牙征服中的一个节点。',source:'https://www.metmuseum.org/es/toah/ht/08/sanc.html'}
];
