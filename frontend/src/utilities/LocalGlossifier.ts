/**
 * LocalGlossifier.ts
 * 
 * Runs ASL gloss conversion INSTANTLY in the browser.
 * Use this for the "text" category to skip the slow Render backend cold-start.
 * 
 * Place this file at: frontend/src/utilities/LocalGlossifier.ts
 */

// ─── Stop words (stripped before gloss) ────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','if','in','on','at','to','for','of','with',
  'by','from','as','is','was','are','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might','shall',
  'can','this','that','these','those','it','its','they','them','their','there',
  'then','so','yet','while','after','before','until','since','about','into',
  'over','under','through','between','i','we','you','he','she','we','us','me',
  'him','her','our','your','my','am','not','no','nor',
]);

// ─── Core vocabulary (animation_words.txt condensed to a Set for O(1) lookup)
// This mirrors your backend/Main/vocab/animation_words.txt exactly
const ANIMATION_WORDS = new Set([
  'a','a lot','abdomen','able','above','accent','accept','accomplish','accountant',
  'act','active','activity','actor','adapt','adjective','admit','adopt','adult',
  'advanced','advantage','adverb','affect','afraid','after','afternoon','again',
  'against','agenda','ago','agree','agreement','ahead','aid','aim','airplane',
  'alarm','alcohol','algebra','all','all day','alligator','alone','also','always',
  'amazing','analyze','anatomy','angle','anniversary','announce','annoy','any',
  'apart','apostrophe','appear','appetite','apple','appointment','approach',
  'appropriate','april','archery','area','arizona','arm','around','arrest','arrive',
  'arrogant','art','article','artist','asia','ask','asl','assist','assistant',
  'attend','attention','auction','audience','audiologist','audiology','august',
  'australia','austria','author','authority','autumn','average','avoid','awake',
  'award','away','awful','baby','back','background','backpack','bad','balance',
  'ball','balloon','banana','bank','baptize','bar','barely','bark','basement',
  'basic','bath','battery','battle','beard','beautiful','become','bed','bedroom',
  'bee','beer','before','beginning','behind','believe','bell','belt','berry',
  'beside','best','bet','between','bible','bicycle','big','bike','binoculars',
  'biology','bird','birthday','bite','bitter','black','blame','blanket','blend',
  'bless','blood','blow','blue','boast','boat','body','bone','book','bookshelf',
  'bookstore','boots','bored','borrow','boss','both','bother','bottle','bottom',
  'box','boxing','boy','boyfriend','bra','bracelet','brag','brave','bread','break',
  'breathe','breeze','bribe','bridge','bright','bring','brochure','broke','brother',
  'brown','buffalo','bug','bull','bully','burp','bus','bush','business','busy',
  'button','buy','cabbage','cabinet','cafeteria','cake','calculate','calculator',
  'california','call','calm','camp','camping','can','candidate','candy','cannot',
  'caption','car','card','cards','care','careful','carnival','carrot','carry',
  'cat','catch','caterpillar','catholic','ceiling','celebrate','cent','center',
  'certificate','chain','chair','champion','chance','change','chapter','character',
  'chase','chat','cheap','check','cheerleader','cheese','chemistry','cherry',
  'chicken','child','china','chocolate','choir','choke','choose','chop','christ',
  'christian','christmas','cigarette','circle','class','clean','clever','climb',
  'closet','cloud','clown','clueless','coat','cochlear implant','coconut','coffee',
  'cold','college','come','come here','comfortable','comma','command','comment',
  'commit','committee','common','commute','complain','complete','computer',
  'concentrate','concern','confront','congratulations','connect','consider',
  'construct','contest','continue','contribute','control','conversation','convert',
  'convince','cook','cookie','cool','cooperate','copy','corn','corner','correct',
  'cough','counsel','counselor','count','court','cover','cow','crab','cracker',
  'crash','crave','crazy','crocodile','cross','crown','cruel','cry','cuba',
  'culture','cup','curse','curtain','customer','cut','cute','dad','daily','damage',
  'dance','danger','dangerous','date','daughter','dawn','day','dead','debate',
  'december','decide','decorate','decrease','defend','degree','delay','delicious',
  'deliver','demand','democrat','demonstrate','dentist','deny','department',
  'deposit','depressed','descend','describe','desert','design','dessert','detach',
  'determine','develop','diamond','diaper','dictionary','different','difficult',
  'dig','dime','dining room','dinosaur','diploma','dirt','disagree','disappear',
  'discipline','disconnect','discount','discuss','disgust','dismiss','disturb',
  'dive','divide','dollar','dolphin','done','double','down','downstairs','drag',
  'dragon','draw','dream','dress','drink','drive','drop','drug','drum','drunk',
  'dry','duck','due','dull','dumb','during','dusk','duty','dvd','dye','ear',
  'early','earring','earthquake','east','easter','easy','educate','education',
  'egg','egypt','eight','eighteen','either','electricity','elephant','elevator',
  'else','email','emotion','empty','encourage','end','energy','engage','engagement',
  'engineer','england','enjoy','enter','envelope','environment','erase','escape',
  'establish','eternity','europe','evening','every','every monday','every tuesday',
  'everyday','exact','exaggerate','example','except','exchange','excuse','exercise',
  'exhibit','expand','expect','expensive','experiment','expert','explode','express',
  'eye','eyeglasses','face','fact','faculty','fail','fake','fall in love','familiar',
  'family','fancy','far','farmer','fast','fault','favorite','february','federal',
  'feel','fence','few','fight','final','finance','find','finish','fire',
  'firefighter','first','fishing','five','fix','flatter','flexible','flirt',
  'flood','floor','florida','flower','follow','food','football','for','forbid',
  'forest','forget','forgive','fork','form','four','fox','france','free','freeze',
  'french fries','friday','friend','friendly','from','from now on','full','fun',
  'funeral','funny','furniture','future','gallaudet','gamble','game','gang',
  'garage','gas','gather','gay','general','generation','geometry','german',
  'germany','get','get up','gift','giraffe','girl','girlfriend','give','glass',
  'glasses','gloves','go','goal','goat','god','gold','gone','good','goodbye',
  'gorilla','gossip','government','grammar','grandma','grandmother','grapes',
  'great','green','grey','group','grow','grow up','guide','guilty','guitar',
  'gum','gun','habit','haircut','half','halloween','hanukkah','happy',
  'hard of hearing','hate','have','hawaii','head','heap','hearing aid','heart',
  'help','her','here','herself','highway','hill','hippopotamus','his','history',
  'hit','hockey','hold','holy','home','homework','honest','honey','hope',
  'hospital','host','hot','hot dog','hour','house','how','hug','human','humble',
  'hurricane','hurt','husband','ice cream','idea','identify','ill','image',
  'impact','important','improve','in','include','independent','india','infection',
  'influence','inform','innocent','inside','inspect','inspire','instead',
  'institute','insurance','interest','international','internet','interpreter',
  'interrupt','interview','invest','investigate','invite','involve','iran',
  'ireland','iron','island','israel','italy','jacket','jail','january','japan',
  'jesus','jewelry','jewish','join','joke','journey','joy','judge','july','jump',
  'june','kangaroo','karate','keep','key','keyboard','kick','kid','kill',
  'kindergarten','king','kiss','kitchen','knife','knock','know','label','lady',
  'lamp','land','language','laptop','last','last week','last year','late',
  'laundry','law','lawyer','lazy','lead','leader','leaf','league','leak','learn',
  'leave','lecture','left','lend','lesbian','less','let','letter','lettuce',
  'liability','librarian','library','lie','lift','light','lightning','like',
  'line','linguistics','lip','lipstick','list','listen','loan','lobster','lock',
  'lonely','long','look at','lord','lose','lousy','love','lucky','lunch',
  'machine','mad','make','man','manager','many','march','marry','match','maximum',
  'maybe','me','mean','meaning','measure','mechanic','medicine','meet','melody',
  'melt','memorize','mention','message','mexico','microphone','microscope',
  'microwave','military','milk','mind','mine','minute','mirror','miss','mix',
  'mock','mom','monday','money','monkey','month','monthly','moon','moose','more',
  'morning','most','mother','motivate','motor','mouth','much','murder','mushroom',
  'music','must','my','myself','name','napkin','narrow','nation','near',
  'necessary','neck','need','negative','nervous','network','new','new york',
  'next','niece','night','nine','nineteen','no','none','normal','north',
  'northwest','not','not yet','nothing','notice','now','number','numerous','nurse',
  'nut','objective','obsess','obtain','occur','ocean','october','odor','off',
  'office','often','ok','old','olympics','on','once','one','onion','only',
  'operate','opinion','orange','order','organize','out','outside','over',
  'overcome','overlook','overwhelm','owl','pack','page','paint','pants','paper',
  'parachute','parade','parallel','parents','part','party','pass','past','path',
  'patient','pause','pay','peace','peaceful','peanut butter','pear','peel',
  'penalty','pencil','pennsylvania','penny','people','pepper','percent','perfect',
  'perfume','period','person','perspective','pet','philadelphia','philosophy',
  'phone','photographer','physician','physics','pick','pickle','picture','pie',
  'piece','pig','pillow','pilot','pink','pity','place','plan','plate','play',
  'player','please','plus','pocket','point','polar bear','police','policeman',
  'polite','politics','poop','popcorn','popular','position','positive','possible',
  'post','postpone','potato','pound','pour','power','practice','pray','preacher',
  'precious','precise','prefer','pregnant','preschool','present','presentation',
  'president','pressure','pretty','prevent','pride','priest','prince','princess',
  'principal','principle','print','printer','priority','prison','problem',
  'process','procrastinate','professor','program','progress','promise','proof',
  'proper','protect','provide','psychologist','psychology','public','publish',
  'pumpkin','punish','pure','purple','purpose','pursue','push','put','put off',
  'puzzled','quality','quarrel','queen','question','quiet','quit','quote',
  'rabbit','raccoon','race','rage','rainbow','rake','rather','read','ready',
  'real','realize','really','reason','receive','recent','recliner','recognize',
  'recommend','red','reduce','referee','refuse','regular','rehearse','reject',
  'relate','relationship','release','relief','rely','remember','remote control',
  'remove','repeat','replace','report','reputation','request','require','research',
  'resign','resist','respect','responsibility','restaurant','restroom','retreat',
  'reveal','revenge','review','rich','ride','ridiculous','ring','rise','river',
  'road','roar','rob','robber','roof','room','roommate','rooster','rope','rose',
  'rubber','ruin','rule','rush','russia','sad','salt','salute','same','sandwich',
  'satisfy','saturday','sauce','sausage','save','saw','say','scan','scared',
  'school','scissors','scold','score','scotland','scream','sea','second','secret',
  'see','seem','seldom','selfish','sell','senate','senior','sensitive','sentence',
  'separate','september','serious','settle','seven','several','sew','shampoo',
  'shape','share','shave','she','shelf','shine','shock','shoot','shop','shopping',
  'should','shoulder','shout','shovel','show','shower','shrimp','shy','sick',
  'side','sign','silent','silly','similar','sin','since','singer','single',
  'siren','sister','sit','situation','six','sixteen','size','skate','skeleton',
  'sketch','ski','skill','skinny','skip','skunk','sky','sleep','sleepy','slice',
  'slip','slow','small','smart','smell','smile','smoking','smooth','snake',
  'sneeze','snob','snowman','soap','soccer','society','socks','soda','sofa',
  'soft','soldier','solid','solve','some','someone','something','sometimes','son',
  'soon','sore throat','sorry','soul','sound','soup','sour','south',
  'south america','spain','spanish','special','specific','speech','speed','spell',
  'spider','spill','spirit','spit','spoon','spray','spread','spring','sprint',
  'square','squeeze','stadium','staff','stairs','stamp','standard','star','stare',
  'statistics','stay','steal','steel','sticky','still','sting','stop','store',
  'story','straight','strange','strawberry','strong','struggle','stuck','student',
  'study','stupid','suffer','suggest','summon','sunday','sunrise','sunset',
  'sunshine','superman','support','suppose','surgeon','surgery','surprise',
  'surrender','suspect','suspend','sweden','sweetheart','swim','swimsuit',
  'switzerland','table','take','take up','tale','talent','tall','tan','tea',
  'teacher','tease','teeth','tell','temperature','temple','tempt','ten','tend',
  'tennis','tent','terrible','test','texas','text','thailand','thank you',
  'thankful','that','then','theory','therapy','there','therefore','thermometer',
  'thick','thin','thing','think','third','thirsty','this','thousand','three',
  'throat','through','throw','thursday','ticket','tiger','time','tiptoe','tired',
  'title','tobacco','today','toilet','tolerate','tomato','tomorrow','tooth',
  'toothbrush','top','topic','tornado','torture','tough','tournament','towel',
  'trade','tradition','train','transfer','travel','tree','triangle','trip',
  'trophy','trouble','truth','tuesday','turkey','turn','tutor','tv','twin','two',
  'type','ugly','umbrella','under','understand','underwear','until','up','upset',
  'upstairs','use','vacant','vague','valley','value','vampire','vegetable','very',
  'vice president','viewpoint','violin','visit','visitor','visualize','vlog',
  'vocabulary','voice','volleyball','volunteer','vomit','vote','wait','wake up',
  'wall','wallet','wander','want','war','warm','warn','wash','wash face',
  'washington','water','waterfall','watermelon','weak','weather','wedding',
  'wednesday','week','weekly','weird','wet','what','whatever','wheelchair',
  'when','where','which','while','white','who','why','wide','wife','willing',
  'win','window','wine','wish','within','without','wolf','woman','wonder',
  'wonderful','wood','word','work','worker','workshop','world','worry','worse',
  'worthless','wow','wrap','wrench','wristwatch','write','wrong','year','yellow',
  'yes','yesterday','you','young','your','yourself','zero',
  // common synonyms pre-mapped
  'father','dad','smooch','kiss','mother','mom',
]);

// ─── Synonym map (browser-side cache of known substitutions) ─────────────────
// These are the most common words that have a known match.
// Extend this as you discover gaps — no backend call needed.
const SYNONYM_MAP: Record<string, string> = {
  // Family
  father:'dad', mother:'mom', mum:'mom', papa:'dad', mama:'mom',
  spouse:'marry', wife:'marry', husband:'marry',
  sibling:'brother', brother:'brother', sister:'sister',
  grandpa:'grandma', grandfather:'grandma', grandmother:'grandmother',
  // Actions
  eat:'food', drinking:'drink', sleeping:'sleep', running:'run',
  walking:'walk', talking:'talk', speak:'talk', speaking:'talk',
  purchase:'buy', buying:'buy', purchased:'buy',
  look:'see', watch:'see', watching:'see', viewing:'see',
  move:'go', going:'go', travel:'travel', travelling:'travel',
  complete:'finish', completed:'finish', done:'finish', finished:'finish',
  want:'want', need:'need', require:'need',
  hurt:'hurt', pain:'hurt', ache:'hurt',
  sick:'ill', unwell:'ill', fever:'ill',
  scared:'afraid', frightened:'afraid', fear:'afraid',
  angry:'mad', furious:'mad', upset:'mad',
  happy:'happy', glad:'happy', pleased:'happy', joyful:'joy',
  unhappy:'sad', miserable:'sad', depressed:'sad',
  // Greetings
  hello:'hello', hi:'hello', hey:'hello', howdy:'hello',
  bye:'goodbye', farewell:'goodbye', goodbye:'goodbye',
  // Common adjectives
  large:'big', huge:'big', enormous:'big',
  tiny:'small', little:'small', mini:'small',
  quick:'fast', rapid:'fast', swift:'fast',
  slow:'slow', sluggish:'slow',
  cold:'cold', freezing:'cold', chilly:'cold',
  hot:'hot', warm:'warm', boiling:'hot',
  tired:'tired', exhausted:'tired', sleepy:'sleepy',
  beautiful:'beautiful', pretty:'pretty', gorgeous:'beautiful',
  ugly:'ugly', hideous:'ugly',
  smart:'smart', clever:'smart', intelligent:'smart',
  stupid:'stupid', dumb:'stupid', foolish:'stupid',
  rich:'rich', wealthy:'rich',
  poor:'poor', broke:'broke', penniless:'poor',
  // Time
  today:'today', tomorrow:'tomorrow', yesterday:'yesterday',
  morning:'morning', afternoon:'afternoon', evening:'evening', night:'night',
  week:'week', month:'month', year:'year', hour:'hour', minute:'minute',
  // Places
  house:'home', apartment:'home', home:'home', school:'school',
  hospital:'hospital', church:'bible', office:'work', store:'store',
  // Misc
  money:'money', cash:'money', dollars:'dollar',
  car:'car', vehicle:'car', truck:'car',
  phone:'phone', mobile:'phone', cellphone:'phone', smartphone:'phone',
  computer:'computer', laptop:'computer', pc:'computer',
  food:'food', meal:'food', dinner:'food', lunch:'lunch', breakfast:'food',
  water:'water', drink:'drink', juice:'drink',
  book:'book', read:'read', write:'write',
  music:'music', song:'music', dance:'dance',
  game:'game', play:'play', sport:'football',
  work:'work', job:'work', career:'work',
  class:'class', school:'school', learn:'learn', study:'study',
  problem:'problem', issue:'problem', trouble:'trouble',
  idea:'idea', plan:'plan', think:'think',
};

// ─── Simple stemmer (strip common suffixes) ───────────────────────────────────
function stem(word: string): string {
  return word
    .replace(/ing$/, '')
    .replace(/tion$/, '')
    .replace(/ness$/, '')
    .replace(/ment$/, '')
    .replace(/ly$/, '')
    .replace(/ful$/, '')
    .replace(/less$/, '')
    .replace(/er$/, '')
    .replace(/ed$/, '')
    .replace(/s$/, '');
}

// ─── Main glossify function ───────────────────────────────────────────────────
export function localGlossify(text: string): string[] {
  if (!text || typeof text !== 'string') return [];

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, ' ')  // strip punctuation except ' and -
    .split(/\s+/)
    .filter(w => w.length > 0);

  const gloss: string[] = [];

  for (const token of tokens) {
    // 1. Skip stop words
    if (STOP_WORDS.has(token)) continue;

    // 2. Direct match in animation vocab
    if (ANIMATION_WORDS.has(token)) {
      gloss.push(token);
      continue;
    }

    // 3. Check synonym map
    if (SYNONYM_MAP[token]) {
      const mapped = SYNONYM_MAP[token];
      if (ANIMATION_WORDS.has(mapped)) {
        gloss.push(mapped);
        continue;
      }
    }

    // 4. Try stemming, then check again
    const stemmed = stem(token);
    if (stemmed && stemmed !== token) {
      if (ANIMATION_WORDS.has(stemmed)) {
        gloss.push(stemmed);
        continue;
      }
      if (SYNONYM_MAP[stemmed] && ANIMATION_WORDS.has(SYNONYM_MAP[stemmed])) {
        gloss.push(SYNONYM_MAP[stemmed]);
        continue;
      }
    }

    // 5. Fallback — keep the original word (backend handles it if needed)
    gloss.push(token);
  }

  return gloss;
}
