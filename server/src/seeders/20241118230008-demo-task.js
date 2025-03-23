const { TaskcategoryId } = require("../models/task.model");

const taskdata = [
  {
    type: "الصلاة",
    title: "احرص على أداء صلاة الفجر في وقتها",
    description:
      "استيقظ مبكرًا والتزم بأداء صلاة الفجر في وقتها المحدد دون تأخير",
    categoryId: 1,
    xp: 5,
    kind: "الفجر",
    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصلاة",
    title: "احرص على أداء صلاة الظهر في وقتها",
    description:
      "توقف عن انشغالك وأدِّ صلاة الظهر فور دخول وقتها دون تأخير",
    categoryId: 1,
    xp: 5,
    kind: "الظهر",
    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصلاة",
    title: "احرص على أداء صلاة العصر في وقتها",
    description:
      "لا تؤخر صلاة العصر وأدِّها فور دخول وقتها لتحصل على الأجر والبركة",
    categoryId: 1,
    xp: 5,
    kind: "العصر",
    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصلاة",
    title: "احرص على أداء صلاة المغرب في وقتها",
    description: "بادر بأداء صلاة المغرب فور غروب الشمس، ولا تؤخرها",
    categoryId: 1,
    xp: 5,
    kind: "المغرب",
    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصلاة",
    title: "احرص على أداء صلاة العشاء في وقتها",
    description: "أدِّ صلاة العشاء في وقتها دون تأخير لتنال الأجر والثواب",
    categoryId: 1,
    xp: 5,
    kind: "العشاء",
    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

 
  {
    type: "الصلاة",
    title: "احرص على الذهاب إلى المسجد للصلاة",
    description: "حاول أداء الصلوات في المسجد خاصة الفجر والعشاء.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصلاة",
    title: "صلِ ركعتين قيام ليل",
    description: "اجعل قيام الليل جزءًا من عبادتك ولو بركعتين.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الصيام
  {
    type: "الصيام",
    title: "صم يومًا من الأيام المستحب صيامها",
    description: "التزم بصيام يوم تطوعًا مثل الاثنين أو الخميس.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصيام",
    title: "شارك في تحضير إفطار للصائمين",
    description: "ساهم في إفطار صائم بنية الأجر والثواب.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصيام",
    title: "تجنب الغيبة والكلام السيئ أثناء صيامك",
    description: "حافظ على صيامك من كل ما ينقصه من قول أو فعل.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصيام",
    title: "صم عن استخدام الهاتف أو مواقع التواصل لفترة معينة",
    description: "خصص وقتًا للصيام عن التكنولوجيا والتأمل في عبادتك.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصيام",
    title: "اقضِ يومًا بالتقليل من الطعام والتركيز على العبادة",
    description: "قلل من طعامك اليومي واجعل تركيزك على العبادة.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الصدقة
  {
    type: "الصدقة",
    title: "تبرع بجزء من مصروفك اليومي للمحتاجين",
    description: "ساهم بجزء من مالك لمساعدة الفقراء والمحتاجين.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصدقة",
    title: "ساهم في شراء طعام أو ملابس لشخص محتاج",
    description:
      "ادخل السرور على قلب محتاج بتوفير ما يحتاجه من طعام أو لباس.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصدقة",
    title: "ضع صدقة في صندوق تبرعات أو جمعية خيرية",
    description: "تصدق سرًا لله تعالى واجعلها عادة مستمرة.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصدقة",
    title: "قدم الماء أو الطعام للحيوانات التي تراها",
    description: "كن رحيمًا بالحيوانات وقدم لها الطعام والماء.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصدقة",
    title: "شارك في مشروع خيري لتحسين حياة الآخرين",
    description: "ساهم في عمل خيري يعود بالفائدة على الآخرين.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // العفو والصفح
  {
    type: "العفو والصفح",
    title: "سامح شخصًا أساء إليك دون انتظار اعتذار",
    description: "اتخذ خطوة نحو التسامح دون انتظار مقابل.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "العفو والصفح",
    title: "تذكر موقفًا سامح فيه النبي ﷺ وطبقه في حياتك",
    description: "استلهم من مواقف النبي ﷺ وطبقها في حياتك اليومية.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "العفو والصفح",
    title: "ادعُ بالخير لشخص أخطأ في حقك",
    description: "ادعُ لمن أساء إليك بدلاً من الرد عليه بسوء.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "العفو والصفح",
    title: "اجلس مع صديق بينك وبينه خلاف وحاول إنهاء النزاع",
    description: "اتخذ خطوة لإنهاء الخلافات وبناء جسور المحبة.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "العفو والصفح",
    title: "ابدأ اليوم بنية الصفح عن أي خطأ قد يحدث",
    description: "اجعل نيتك العفو مقدماً عن أي إساءة قد تتعرض لها.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الشكر
  {
    type: "الشكر",
    title: "اكتب قائمة بثلاث نعم أنعم الله بها عليك اليوم",
    description: "دوِّن النعم التي تحيط بك يومياً لتعزيز الامتنان.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الشكر",
    title: "اشكر شخصًا ساعدك بكلمة أو فعل",
    description: "لا تنسَ التعبير عن امتنانك لمن قدم لك العون.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الشكر",
    title: 'ردد يوميًا: "اللهم لك الحمد حتى ترضى"',
    description: "اجعل الشكر عادة يومية بذكر الله وحمده.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الشكر",
    title: "شارك في نشر الوعي عن قيمة الشكر بين أصدقائك",
    description: "ساهم في نشر ثقافة الامتنان والشكر بين معارفك.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الشكر",
    title:
      "توقف للحظات يوميًا لتفكر في نعمة واحدة لا تدرك أهميتها في حياتك",
    description: "تأمل في النعم المخفية التي تستفيد منها دون أن تشعر.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الصبر
  {
    type: "الصبر",
    title: "اقرأ قصة عن صبر الأنبياء وتعلم منها",
    description: "تعرف على مواقف الصبر من حياة الأنبياء واستلهم منها.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصبر",
    title: "واجه موقفًا صعبًا بالصمت والتفكير قبل الرد",
    description: "مارس التحكم في النفس عند الغضب أو التوتر.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصبر",
    title: "جدد نيتك بالصبر عند أداء واجب أو عمل شاق",
    description: "تذكر فضل الصبر عند الشعور بالتعب أو المشقة.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الصبر",
    title: "ذكر نفسك يوميًا بأن الصبر مفتاح الفرج",
    description: "اجعل الصبر مبدأً ثابتًا في حياتك اليومية.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الذكر
  {
    type: "الذكر",
    title: "اقرأ ورد يومي من القرآن الكريم",
    description: "اجعل قراءة القرآن عادة يومية ولو بآيات قليلة.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الذكر",
    title: "تدبر 10 آيات من القرآن الكريم",
    description: "خصص وقتًا لفهم معاني آيات القرآن الكريم.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الذكر",
    title: "اقرأ أذكار الصباح والمساء بتدبر",
    description: "اجعل الأذكار جزءًا من يومك بتدبر معانيها.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الذكر",
    title: "تفكر في أحد أسماء الله وصفاته واربطها بحياتك اليومية",
    description: "تعلم أحد أسماء الله الحسنى وتدبر أثره في حياتك.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الذكر",
    title: "خصص وقتًا لتسبيح الله 100 مرة",
    description: "اجعل التسبيح عادة يومية لنيل الأجر العظيم.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الذكر",
    title: "خصص وقتًا لحمد الله 100 مرة",
    description: "احرص على حمد الله يوميًا لزيادة النعم.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },

  // الدعاء
  {
    type: "الدعاء",
    title: "خصص وقتًا يوميًا للدعاء وطلب العون من الله",
    description: "اجعل الدعاء عادة يومية في حياتك.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الدعاء",
    title: "ادعُ الله بإلحاح لتحقيق أمنية تتمنى حدوثها",
    description: "ألح في الدعاء لتحقيق ما تتمناه بإذن الله.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الدعاء",
    title: "جهز قائمة بأسماء أشخاص تحبهم وادعُ لهم في صلاتك",
    description: "خصص جزءًا من دعائك للأحبة والأصدقاء.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الدعاء",
    title: "اختر دعاءً من السنة النبوية واحرص على تكراره يوميًا",
    description: "حافظ على أحد الأدعية النبوية في يومك.",
    categoryId: 1,
    xp: 5,

    snabelRed: 2,
    snabelYellow: 2,
    snabelBlue: 2,
  },
  {
    type: "الإحسان للجسد",
    title: "مارس الرياضة يومياً لمدة 15 دقيقة",
    description: "خصص 15 دقيقة يومياً لممارسة التمارين الرياضية للحفاظ على نشاط جسمك وصحتك.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للجسد",
    title: "تناول وجبة متوازنة تشمل الخضروات والفواكه",
    description: "احرص على أن تحتوي وجبتك اليومية على عناصر غذائية متكاملة تشمل الخضروات والفواكه.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للجسد",
    title: "اشرب 6-8 أكواب من الماء",
    description: "حافظ على ترطيب جسمك بشرب كمية كافية من الماء يوميًا.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للجسد",
    title: "احرص على النوم مبكرًا للحصول على 8 ساعات من الراحة",
    description: "نل قسطًا كافيًا من النوم لتحافظ على صحتك ونشاطك اليومي.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للجسد",
    title: "ابتعد عن الأطعمة غير الصحية",
    description: "تجنب الأطعمة غير الصحية للحفاظ على نشاطك وصحتك.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للعقل",
    title: "اقرأ قصة أو كتاب يزيد من معرفتك",
    description: "خصص وقتًا يوميًا لقراءة قصة أو كتاب لتنمية معرفتك وزيادة ثقافتك.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للعقل",
    title: "حل لغز أو مسألة رياضية لتنشيط التفكير",
    description: "اختبر قدراتك الذهنية بحل الألغاز أو المسائل الرياضية.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للعقل",
    title: "تعلم كلمة أو مهارة جديدة",
    description: "اجعل تعلم شيء جديد عادة يومية لتطوير ذاتك.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للعقل",
    title: "خصص 20 دقيقة يومياً لمراجعة دروس المدرسة",
    description: "احرص على تخصيص 20 دقيقة يوميًا لمراجعة دروسك لتعزيز تحصيلك الدراسي.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
  {
    type: "الإحسان للعقل",
    title: "اكتب ثلاث جمل تعبر عن فكرة جديدة تعلمتها",
    description: "دون يوميًا ثلاث جمل تعبر عن فكرة جديدة اكتسبتها لتعزيز التعلم الذاتي.",
    categoryId: 2,
    xp: 5,

    snabelRed: 1,
    snabelYellow: 1,
    snabelBlue: 2
  },
{
  type: "الإحسان للروح",
  title: "اقرأ أذكار الصباح والمساء كل يوم",
  description: "اجعل قراءة أذكار الصباح والمساء عادة يومية لزيادة الطمأنينة والراحة النفسية.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "اقرأ بتدبر صفحة من القرآن مع فهم معانيها",
  description: "خصص وقتًا يوميًا لقراءة صفحة من القرآن مع التدبر في معانيها لتقوية روحك وإيمانك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "تأمل في السماء لمدة خمس دقائق",
  description: "خذ لحظات يومية لتأمل السماء وشعورك بجمال الكون واتساعه.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "تأمل في أحد المخلوقات أو النباتات لمدة خمس دقائق",
  description: "انظر إلى أحد المخلوقات أو النباتات بعين متأملة في عظمة الخلق وإبداع الله.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "قم بالدعاء لوالديك",
  description: "خصص وقتًا يوميًا للدعاء لوالديك، سواء كانوا أحياء أو متوفين، تعبيرًا عن حبك وبرّك لهما.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "اقض وقتًا في ذكر الله",
  description: "اجعل لك وردًا يوميًا من الأذكار والتسبيح لتطمئن روحك وتقوي علاقتك بالله.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "حافظ على الصلاة في وقتها",
  description: "التزم بأداء الصلوات الخمس في أوقاتها دون تأخير لتعزيز علاقتك بالله.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "قم بالدعاء لنفسك",
  description: "اجعل الدعاء عادة يومية، واطلب من الله العون والرحمة والتوفيق في حياتك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "اشكر الله على نعمة تشعر بها اليوم",
  description: "كل يوم، فكر في نعمة جديدة أنعم الله بها عليك واشكره عليها.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "ادعُ بالخير لأناس لا تعرفهم",
  description: "خصص وقتًا يوميًا للدعاء لأشخاص لا تعرفهم، فهذا يزرع الخير في قلبك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للروح",
  title: "امشِ في الطبيعة ولو لمسافة قصيرة",
  description: "اقضِ وقتًا يوميًا في المشي في الطبيعة لتصفية ذهنك والتأمل في جمال الخلق.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "ابدأ صباحك بتعديد نوايا إيجابية",
  description: "خصص لحظات في بداية يومك لتحديد نوايا إيجابية تعزز يومك بالطاقة الجيدة.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "سامح من أخطأ في حقك دون انتظار اعتذار",
  description: "تحلَّى بالتسامح وحرر قلبك من الضغائن حتى بدون تلقي اعتذار.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اكتب ٧ أشياء أنت ممتن لها",
  description: "خصص وقتًا يوميًا لكتابة سبع نعم تشعر بالامتنان لوجودها في حياتك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اكتب 3 صفات جميلة في أحد أصدقائك أو أفراد عائلتك",
  description: "اكتب ثلاث صفات إيجابية في شخص تعرفه لتعزيز نظرتك الإيجابية للآخرين.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "إذا شعرت بالغضب، قم بعدّ حتى الرقم 10 ثم تنفس بعمق",
  description: "عند الغضب، استخدم تقنية العد والتنفس العميق للسيطرة على انفعالاتك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "مارس هواية تحبها",
  description: "خصص وقتًا لممارسة هواية تستمتع بها لتجديد طاقتك وتحسين مزاجك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "ساعد في عمل خير، مثل مساعدة زميل في الدراسة أو عمل تطوعي",
  description: "خصص وقتًا يوميًا لفعل الخير، سواء بمساعدة زميل أو المشاركة في عمل تطوعي.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اذكر مميزات شخص تعرفه بدلاً من التركيز على عيوبه",
  description: "درّب نفسك على رؤية الإيجابيات في الآخرين بدلاً من التركيز على العيوب.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اكتب أو ارسم ما تشعر به",
  description: "استخدم الكتابة أو الرسم للتعبير عن مشاعرك والتخفيف من التوتر.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اشكر نفسك على السعي للإحسان",
  description: "خصص لحظة لشكر نفسك على جهودك المستمرة للتحسين والتطور.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "احفظ حديث النبي ﷺ: “ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب”",
  description: "تعلم هذا الحديث النبوي وردده عند الغضب لضبط نفسك وتعزيز أخلاقك.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "قم بعمل بسيط دون إخبار أحد مثل تنظيف مكان عام أو مساعدة محتاج",
  description: "مارس الإحسان الخفي عبر فعل الخير دون انتظار مقابل أو شهرة.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "خصص وقتًا لكتابة 3 نعم جديدة تشكر الله عليها في دفتر النعم",
  description: "دوّن يوميًا ثلاث نعم جديدة لتزيد من إحساسك بالامتنان والسعادة.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "قدم هدية بسيطة لشخص حقق نجاحًا",
  description: "ادعم من حولك بالهدايا البسيطة لتعزيز مشاعر الفرح والتقدير بدلاً من الحسد.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "لا تقارن نفسك بالآخرين وركز على تحسين ذاتك بدلًا من الالتفات لما لديهم",
  description: "اجعل تركيزك على تطوير نفسك بدلًا من مقارنة حياتك بحياة الآخرين.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "ابتسم دائمًا في وجه من يقابلك",
  description: "ابتسم للناس، فالابتسامة تفتح القلوب وتنشر حسن الظن.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},
{
  type: "الإحسان للقلب",
  title: "اكتب قائمة بأكثر ما يثير غضبك ثم خطط لكيفية التعامل مع كل موقف",
  description: "حدد مسببات الغضب لديك، ثم ضع خطة للتحكم بها بطرق إيجابية.",
  categoryId: 2,
  xp: 5,
  snabelRed: 1,
  snabelYellow: 1,
  snabelBlue: 2
},

  {
    type: "بر الوالدين",
    title: "قم بتحضير وجبة الإفطار أو العشاء للعائلة",
    description: "أدخل السرور على عائلتك بإعداد وجبة بسيطة لهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "بر الوالدين",
    title: "رتب غرفتك أو قم بتنظيف المنزل لتخفيف الأعباء عن والديك",
    description: "اجعل والديك يشعران بالراحة عبر ترتيب وتنظيف المنزل.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "بر الوالدين",
    title: "اشترِ هدية رمزية وقدمها لوالدك أو والدتك",
    description: "عبّر عن حبك لوالديك بهدية رمزية تدخل السرور عليهما.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "بر الوالدين",
    title: "اكتب بطاقة شكر معبرة وأهديها لوالديك",
    description: "اكتب رسالة تقدير لوالديك واشكرهم على جهودهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "صلة الرحم",
    title: "اتصل بأحد أقاربك الذين لم تتحدث معهم منذ فترة طويلة",
    description: "قم بإعادة التواصل مع أقاربك لبناء علاقات أقوى.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "صلة الرحم",
    title: "قم بزيارة أحد أفراد العائلة واهدِ لهم شيئًا بسيطًا",
    description: "خصص وقتًا لزيارة أحد أفراد الأسرة وقدم لهم هدية صغيرة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "صلة الرحم",
    title: "شارك في ترتيب تجمع عائلي صغير",
    description: "ساعد في تنظيم لقاء عائلي لتعزيز الروابط الأسرية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "صلة الرحم",
    title: "ساعد قريبًا أصغر منك في دراسته أو هواياته",
    description: "قدّم الدعم لأحد أقاربك الأصغر منك في التعلم أو ممارسة هوايته.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الصدق والأمانة",
    title: "التزم بإنجاز وعد قطعته على نفسك",
    description: "كن صادقًا مع نفسك والآخرين عبر الالتزام بوعودك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الصدق والأمانة",
    title: "احرص على أن تقول الصدق دائمًا، حتى في المواقف الصعبة",
    description: "مارس الصدق في جميع تعاملاتك مهما كان الأمر صعبًا.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الصدق والأمانة",
    title: "قم بإعادة أي شيء اقترضته من الآخرين",
    description: "أعد أي شيء استعرتَه من شخص آخر احترامًا للأمانة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الصدق والأمانة",
    title: "كن أمينًا في أداء واجباتك الدراسية أو العملية",
    description: "أدِّ واجباتك بأمانة دون غش أو تقصير.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إكرام الضيف",
    title: "حضّر مشروبًا أو وجبة خفيفة لضيوف عائلتك",
    description: "اجعل الضيافة مميزة بتقديم مشروب أو وجبة خفيفة للضيوف.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إكرام الضيف",
    title: "قدم كرسيك لشخص يحتاجه أكثر أثناء تجمع",
    description: "كن كريمًا بتقديم مكانك لشخص بحاجة إليه أثناء التجمعات.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إكرام الضيف",
    title: "ارحب بضيوفك بابتسامة وكلمات لطيفة",
    description: "اظهر حسن الضيافة من خلال الترحيب الحار والابتسامة الصادقة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإحسان للجار",
    title: "قدم لجارك هدية بسيطة مثل طبق طعام",
    description: "فاجئ جارك بهدية صغيرة تعبر عن الود والمحبة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإحسان للجار",
    title: "اسأل جارك إن كان بحاجة لأي مساعدة",
    description: "ابذل جهدًا في دعم جارك والوقوف بجانبه عند الحاجة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإحسان للجار",
    title: "شارك جارك في تنظيف أو تنظيم المنطقة المشتركة",
    description: "ساهم في تحسين البيئة المحيطة بك عبر التعاون مع الجيران.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "توقير الكبير ورحمة الصغير",
    title: "ساعد جدك أو جدتك في ترتيب المنزل أو القيام بالأعمال اليومية",
    description: "اقضِ بعض الوقت في مساعدة أجدادك في مهامهم اليومية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "توقير الكبير ورحمة الصغير",
    title: "قدم المساعدة لكبار السن في التسوق أو حمل الأغراض",
    description: "أظهر احترامك لكبار السن بمساعدتهم في احتياجاتهم اليومية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "توقير الكبير ورحمة الصغير",
    title: "خصص وقتًا للعب مع الأطفال الصغار في عائلتك",
    description: "قم بإدخال الفرح إلى قلوب الأطفال عبر قضاء وقت ممتع معهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التهادي",
    title: "جهز هدية بسيطة لأحد أصدقائك",
    description: "اختر هدية بسيطة تعبر عن تقديرك لأحد أصدقائك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التهادي",
    title: "قدم وردة لشخص تحب",
    description: "عبّر عن مشاعرك الإيجابية عبر تقديم وردة جميلة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التهادي",
    title: "اكتب رسالة لطيفة لشخص تعتقد أنه بحاجة لدعمك",
    description: "قم بكتابة رسالة تشجيعية لمن يحتاج الدعم النفسي.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإطعام",
    title: "ساهم في توزيع وجبات غذائية على المحتاجين",
    description: "شارك في توزيع الطعام على من هم بحاجة إليه.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإطعام",
    title: "حضّر وجبة وقدمها لشخص يعمل في منطقتك",
    description: "فاجئ أحد العمال بوجبة طعام تعبيرًا عن تقديرك لجهوده.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإطعام",
    title: "قم بالمساهمة في مشروع خيري لتوزيع الطعام",
    description: "ادعم مبادرات إطعام المحتاجين بمساهمتك الفعالة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الرحمة والرفق",
    title: "قم بالدعاء لشخص بينك وبينه خلاف",
    description: "كن متسامحًا وادعُ لمن بينك وبينه سوء تفاهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الرحمة والرفق",
    title: "ادعُ بالخير للآخرين، خاصةً من تعرف أنهم يمرون بوقت صعب",
    description: "قدّم دعوة صادقة بالخير لمن يحتاج إلى دعم معنوي.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الرحمة والرفق",
    title: "كن لطيفًا مع الحيوانات وقدم لها الماء أو الطعام",
    description: "اظهر الرحمة بالكائنات الحية عبر توفير الطعام والماء لها.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الوفاء والامتنان",
    title: "اكتب رسالة شكر لمعلمتك في المدرسة",
    description: "عبّر عن امتنانك لمعلمتك برسالة تقدير وشكر.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الوفاء والامتنان",
    title: "اشكر من يساعدك يوميًا مثل سائق الحافلة أو عامل النظافة",
    description: "قل شكرًا لمن يعمل يوميًا لتسهيل حياتك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الوفاء والامتنان",
    title: "قم بعمل جميل تعبيرًا عن امتنانك لشخص دعمك",
    description: "ارسم البسمة على وجه شخص كان له دور في دعمك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إدخال السرور",
    title: "جهز مفاجأة بسيطة لأحد أصدقائك",
    description: "افرح صديقك بمفاجأة بسيطة تدخل السرور على قلبه.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إدخال السرور",
    title: "شارك في تنظيم نشاط ترفيهي للأطفال",
    description: "ساهم في إسعاد الأطفال من خلال مشاركتك في نشاط ترفيهي لهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إدخال السرور",
    title: "أرسل رسالة مليئة بالكلمات الإيجابية لصديق",
    description: "شجع أحد أصدقائك برسالة إيجابية تعزز من معنوياته.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إيناس الوحشان وترك التناجي",
    title: "اقضِ وقتًا مع شخص يشعر بالوحدة",
    description: "ساعد شخصًا يشعر بالوحدة عبر قضاء وقت ممتع معه.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إيناس الوحشان وترك التناجي",
    title: "أرسل رسالة تحفيزية لشخص تعرف أنه يمر بأيام صعبة",
    description: "ادعم أحد معارفك برسالة تحفيزية ترفع من معنوياته.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إيناس الوحشان وترك التناجي",
    title: "ادعُ شخصًا وحيدًا لتناول الطعام أو للمشي معك",
    description: "اجعل شخصًا يشعر بالوحدة سعيدًا بدعوته للخروج معك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإصلاح بين متخاصمين",
    title: "تحدث مع طرفين متخاصمين وادعُهما للحوار الهادئ",
    description: "كن وسيطًا خيرًا وساهم في إصلاح ذات البين بين المتخاصمين.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الإصلاح بين متخاصمين",
    title: "اعفو عن من أساء إليك",
    description: "كن متسامحًا واغفر لمن أخطأ في حقك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التبسم وإفشاء السلام",
    title: "ابتسم لكل من تقابله اليوم",
    description: "اجعل يومك مشرقًا بابتسامتك في وجه الجميع.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التبسم وإفشاء السلام",
    title: "ألقِ السلام على أشخاص لا تعرفهم",
    description: "ابدأ بتحية الآخرين وانشر السلام بينهم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التبسم وإفشاء السلام",
    title: "ابدأ يومك برسالة مليئة بالسلام لأصدقائك",
    description: "أرسل رسالة صباحية تنشر الأمل والسلام بين أصدقائك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إماطة الأذى عن الطريق",
    title: "التقط القمامة من الطريق وضعها في مكانها الصحيح",
    description: "حافظ على نظافة بيئتك بإزالة الأذى من الطريق.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إماطة الأذى عن الطريق",
    title: "ساهم في حملة تنظيف",
    description: "شارك في تنظيف بيئتك واجعلها مكانًا أجمل للعيش.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "إماطة الأذى عن الطريق",
    title: "أصلح شيئًا معطوبًا قد يؤذي المارة",
    description: "ساهم في سلامة الآخرين بإصلاح أي ضرر في الطريق.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  }
,
  {
    type: "التعاون",
    title: "اعمل مع الآخرين بروح التعاون، فيد الله مع الجماعة",
    description: "ساعد زميلك في أداء مهمة صعبة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التعاون",
    title: "شارك في تنظيف الصف أو المدرسة",
    description: "ساهم في تحسين البيئة المحيطة بك عبر التعاون مع الآخرين.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "التعاون",
    title: "قم بتقديم يد العون لأفراد عائلتك في الأعمال المنزلية",
    description: "ساعد أفراد عائلتك في الأعمال اليومية لتعزيز روح التعاون.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الكلمة الطيبة والإحسان في القول",
    title: "الكلمة الطيبة كشجرة طيبة، فازرع كلماتك كزهور في قلوب الآخرين",
    description: "قل كلمة طيبة لـ 7 أشخاص اليوم.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الكلمة الطيبة والإحسان في القول",
    title: "اكتب رسالة تشجيعية لشخص يحتاج إلى الدعم",
    description: "قدّم الدعم النفسي لشخص يحتاج إليه عبر رسالة تشجيعية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "الكلمة الطيبة والإحسان في القول",
    title: "احرص على استخدام كلمات إيجابية ولطيفة طوال اليوم",
    description: "استخدم كلمات إيجابية ولطيفة في تعاملاتك اليومية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "المشاركة والإيثار",
    title: "قدم الآخرين على نفسك في الخير، فالإيثار قمة الأخلاق",
    description: "ادخر جزءًا صغيرًا من مصروفك للتبرعات الخيرية.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "المشاركة والإيثار",
    title: "شارك شخصًا محتاجًا بشيء تحبه جدًا",
    description: "قدّم شيئًا تحبه لشخص محتاج كتعبير عن الإيثار.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "المشاركة والإيثار",
    title: "تبرع بشيء مميز لديك لمحتاج",
    description: "قدّم شيئًا مميزًا لديك لشخص محتاج.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "إن السعادة في المساعدة، فلا تتأخر عن مد يد العون لمن يحتاجك",
    description: "قم بزيارة دار أيتام أو دار مسنين.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "شارك في إعداد وجبات وتوزيعها على المحتاجين",
    description: "ساهم في إعداد وتوزيع وجبات طعام على المحتاجين.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "ساعد صديقًا يحتاج إلى دعمك في وقت صعب",
    description: "قدّم الدعم لصديق يمر بوقت صعب.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "نظم حملة تبرع بالملابس أو الألعاب للأطفال",
    description: "نظم حملة تبرع لدعم الأطفال المحتاجين.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "اقضِ وقتًا مع شخص وحيد أو بحاجة لدعم نفسي",
    description: "قدّم الدعم النفسي لشخص يشعر بالوحدة.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "قم بزيارة للأطفال في المستشفيات لقراءة القصص أو تقديم الهدايا",
    description: "قدّم الدعم للأطفال في المستشفيات عبر القراءة أو تقديم الهدايا.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "اجمع الكتب أو الألعاب أو الملابس غير المستخدمة في منزلك وتبرع بها",
    description: "تبرع بالكتب أو الألعاب أو الملابس غير المستخدمة لديك.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  {
    type: "قضاء الحوائج ومساعدة الآخرين",
    title: "قدم مساعدة صغيرة لشخص لا تعرفه",
    description: "قدّم مساعدة صغيرة لشخص غريب كتعبير عن الإحسان.",
    categoryId: 3,
    xp: 5,
    snabelRed: 1,
    snabelYellow: 2,
    snabelBlue: 1
  },
  
    {
      type: "عدم الإسراف",
      title: "ابدأ حملة توعية في المدرسة أو بين أسرتك لترشيد استهلاك المياه",
      description: "قم بتوعية الآخرين بأهمية ترشيد استهلاك المياه.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "عدم الإسراف",
      title: "استخدم بدائل لمنتجات البلاستيك",
      description: "استبدل المنتجات البلاستيكية ببدائل صديقة للبيئة.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "عدم الإسراف",
      title: "قم بإعادة تدوير أحد الأشياء التي لا تستخدمها",
      description: "أعد تدوير شيء قديم لتحويله إلى شيء مفيد.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "عدم الإسراف",
      title: "حافظ على البيئة من خلال عدم إهدار الموارد (ماء، كهرباء، طعام)",
      description: "قلل من هدر الموارد الطبيعية في حياتك اليومية.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الاحسان للمخلوقات (الطيور والحيوانات)",
      title: "ضع وعاء ماء أو بعض الطعام للحيوانات أو الطيور خارج منزلك",
      description: "ساعد الحيوانات والطيور بتوفير الطعام والماء لهم.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الغرس",
      title: "ازرع نباتًا صغيرًا أو قم بتنظيف مساحة صغيرة في المدرسة أو المنطقة المحيطة بك",
      description: "ساهم في تحسين البيئة بزراعة النباتات أو تنظيف الأماكن العامة.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الغرس",
      title: "قم بالاعتناء بنبات موجود في المنزل",
      description: "اهتم بنباتات منزلك لتنمو بشكل صحي.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الغرس",
      title: "اغرس شجرة أو زهور في مكان مناسب",
      description: "ساهم في تحسين البيئة بزراعة الأشجار أو الزهور.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الإحسان للأرض والنبات",
      title: "اقضِ 10 دقائق على الأقل في الطبيعة (حديقة، شرفة، نافذة تطل على الخارج)",
      description: "استمتع بجمال الطبيعة وتأمل في خلق الله.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الإحسان للأرض والنبات",
      title: "تفكر في جمال المخلوقات والنظام الكوني الذي خلقه الله",
      description: "تأمل في إبداع الله في خلق الكون والمخلوقات.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الإحسان للأرض والنبات",
      title: "شارك في تنظيف شاطئ أو حديقة عامة",
      description: "ساهم في تحسين البيئة بتنظيف الأماكن العامة.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الإحسان للأرض والنبات",
      title: "التقط القمامة من على الأرض",
      description: "حافظ على نظافة البيئة بإزالة القمامة من الأماكن العامة.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    {
      type: "الإحسان للأرض والنبات",
      title: "نظم نشاط لتنظيف أو تحسين البيئة (تجميع مخلفات، ترتيب مكان)",
      description: "قم بتنظيم نشاط لتحسين البيئة المحيطة بك.",
      categoryId:4,
      xp: 5,
      snabelRed: 2,
      snabelYellow: 1,
      snabelBlue: 1
    },
    
  ].map((task, index) => ({
    id: index + 1, // Incrementing ID starting from 1
    ...task, // Spread the existing task properties
  }));

module.exports = {
  data: taskdata, // ✅ Explicitly export the data
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tasks", );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};