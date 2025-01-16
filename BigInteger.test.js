﻿/// <reference path="BigInteger.js" />
var testResults = (function (bigInt) {
    var assertions = [];
    var assert = function (obj) {
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            var test = obj[i], title = i;
            var result = test ? "<b>Passed</b>" : "<u>Failed</u>";
            assertions.push(title + ": " + result);
        }
    };

    function factorial(n) {
        if (n.equals(bigInt.zero) || n.equals(bigInt.one)) {
            return bigInt.one;
        }
        return factorial(n.prev()).times(n);
    }

    assert({
        "1 = 1": bigInt.one.equals(1),
        "-1 = -1": bigInt.minusOne.equals(-1),
        "987 = 987": bigInt("987").equals("987"),
        "0000000000 = 0": bigInt("0000000000").equals("0"),
        "00000000023 = 23": bigInt("00000000023").equals("23"),
        "9999999 + 1 = 10000000": bigInt("9999999").add(1).equals(10000000),
        "-123456789 = -123456789": bigInt("-123456789").equals("-123456789"),
        "12e5 = 1200000": bigInt("12e5").equals(1200000),
        "str.equals(num)": bigInt("1").equals(1),
        "bInt.equals(bInt)": bigInt(123).equals(bigInt(123)),
        "0 = -0": bigInt("0").equals("-0"),
        "54 != -54": bigInt(54).notEquals(-54),
        "4 > 2": bigInt(4).greater(2),
        "4 >= 2": bigInt(4).greaterOrEquals(2),
        "2 >= 2": bigInt(2).greaterOrEquals(2),
        "2 > -2": bigInt(2).greater(-2),
        "2 < 4": bigInt(2).lesser(4),
        "2 <= 4": bigInt(2).lesserOrEquals(4),
        "2 <= 2": bigInt(2).lesserOrEquals(2),
        "-2 < 2": bigInt(-2).lesser(2),
        "0 != 1": bigInt(0).notEquals(1),
        "1 + 1 = 2": bigInt(1).plus(1).equals(2),
        "1 + -5 = -4": bigInt(1).plus(-5).equals(-4),
        "-1 + 5 = 4": bigInt(-1).plus(5).equals(4),
        "-1 + -5 = -6": bigInt(-1).plus(-5).equals(-6),
        "1234567890987654321 + 9876543210123456789": bigInt("1234567890987654321").plus("9876543210123456789").equals("11111111101111111110"),
        "7 - 3 = 4": bigInt(7).minus(3).equals(4),
        "7 - -3 = 10": bigInt(7).minus(-3).equals(10),
        "-7 - 3 = -10": bigInt(-7).minus(3).equals(-10),
        "-7 - -3 = -4": bigInt(-7).minus(-3).equals(-4),
        "0 - 5 = -5": bigInt(0).minus(5).equals(-5),
        "|-2| = 2": bigInt(-2).abs().equals(2),
        "100 * 100 = 10000": bigInt(100).times(100).equals(10000),
        "-100 * 100 = -10000": bigInt(-100).times(100).equals(-10000),
        "100 * -100 = -10000": bigInt(100).times(-100).equals(-10000),
        "-100 * -100 = 10000": bigInt(-100).times(-100).equals(10000),
        "1234567890987654321 * 132435465768798 = 163500573666152634716420931676158": bigInt("1234567890987654321").times("132435465768798").equals("163500573666152634716420931676158"),
        "0 / 1 = 0": bigInt(0).over(1).equals(0),
        "15 / 5 = 3": bigInt(15).over(5).equals(3),
        "15 / -5 = -3": bigInt(15).over(-5).equals(-3),
        "-15 / 5 = -3": bigInt(-15).over(5).equals(-3),
        "-15 / -5 = 3": bigInt(-15).over(-5).equals(3),
        "786456456335437356436 / 5423424653 = 145011041298": bigInt("786456456335437356436").over("5423424653").equals(145011041298),
        "93453764643534523 / 2342 = 39903400787162": bigInt("93453764643534523").over(2342).equals("39903400787162"),
        "124234233 % 2 = 1": bigInt(124234233).mod(2).equals(1),
        "124234233 % -2 = 1": bigInt(124234233).mod(-2).equals(1),
        "-124234233 % 2 = -1": bigInt(-124234233).mod(2).equals(-1),
        "-124234233 % -2 = -1": bigInt(-124234233).mod(-2).equals(-1),
        "93453764643534523 % 2342 = 1119": bigInt("93453764643534523").mod(2342).equals(1119),
        "32542543 % 100000000 = 32542543": bigInt(32542543).mod(100000000).equals(32542543),
        "2 ^ 3 = 8": bigInt(2).pow(3).equals(8),
        "-2 ^ 3 = -8": bigInt(-2).pow(3).equals(-8),
        "2 ^ -3 = 0": bigInt(2).pow(-3).equals(0),
        "0-- = -1": bigInt.zero.prev().equals(-1),
        "9007199254740992++ = 9007199254740993": bigInt(9007199254740992).next().equals("9007199254740993"),
        "0 is positive": bigInt("0").isPositive(),
        "-0 is negative": bigInt("-0").isNegative(),
        "9354350000204231 is positive": bigInt(9354350000204231).isPositive(),
        "-42000000000 is negative": bigInt(-42000000000).isNegative(),
        "0 is even": bigInt.zero.isEven(),
        "135313531353135313531353135312 is even": bigInt("135313531353135313531353135312").isEven(),
        "135313531353135313531353135313 is odd": bigInt("135313531353135313531353135313").isOdd(),
        "100 ^ 56 !== 0": bigInt(100).pow(56).toString() !== "0", //https://github.com/peterolson/BigInteger.js/issues/5
        "Leading zeroes": bigInt("10000000").toString() === "10000000",
        "Leading zeroes 2": bigInt("100001010000000").toString() === "100001010000000",
        "10 Factorial": (function () {
            var res = "3628800"; //http://www.wolframalpha.com/input/?i=10%21
            return factorial(bigInt(10)).equals(res);
        })(),
        "Immutable during add": (function () {        	
            var a = bigInt("14930352");
            a.add(9227465);
            return a.equals("14930352");
        })(),
        "Immutable during minus": (function () {        	
            var a = bigInt("14930352");
            a.minus(9227465);
            return a.equals("14930352");
        })(),
        "100 Factorial": (function () {
            var res = "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"; //http://puzzles.nigelcoldwell.co.uk/nineteen.htm
            return factorial(bigInt(100)).equals(res);
        })(),
        "3 ^ 10000": bigInt(3).pow(10000).toString() === "16313501853426258743032567291811547168121324535825379939348203261918257308143190787480155630847848309673252045223235795433405582999177203852381479145368112501453192355166224391025423628843556686559659645012014177448275529990373274425446425751235537341867387607813619937225616872862016504805593174059909520461668500663118926911571773452255850626968526251879139867085080472539640933730243410152186914328917354576854457274195562218013337745628502470673059426999114202540773175988199842487276183685299388927825296786440252999444785694183675323521704432195785806270123388382931770198990841300861506996108944782065015163410344894945809337689156807686673462563038164792190665340124344133980763205594364754963451564072340502606377790585114123814919001637177034457385019939060232925194471114235892978565322415628344142184842892083466227875760501276009801530703037525839157893875741192497705300469691062454369926795975456340236777734354667139072601574969834312769653557184396147587071260443947944862235744459711204473062937764153770030210332183635531818173456618022745975055313212598514429587545547296534609597194836036546870491771927625214352957503454948403635822345728774885175809500158451837389413798095329711993092101417428406774326126450005467888736546254948658602484494535938888656542746977424368385335496083164921318601934977025095780370104307980276356857350349205866078371806065542393536101673402017980951598946980664330391505845803674248348878071010412918667335823849899623486215050304052577789848512410263834811719236949311423411823585316405085306164936671137456985394285677324771775046050970865520893596151687017153855755197348199659070192954771308347627111052471134476325986362838585959552209645382089055182871854866744633737533217524880118401787595094060855717010144087136495532418544241489437080074716158404895914136451802032446707961058757633345691696743293869623745410870051851590672859347061212573446572045088465460616826082579731686004585218284333452396157730036306379421822435818001505905203918209206969662326706952623512427380240468784114535101496733983401240219840048956733689309620321613793757156727562461651933397540266795963865921590913322060572673349849253303397874242381960775337182730037783698708748781738419747698880321601186310506332869704931303076839444790968339306301273371014087248060946851793697973114432706759288546077622831002526800554849696867710280945946603669593797354642136622231192695027321229511912952940320879763123151760555959496961163141455688278842949587288399100273691880018774147568892650186152065335219113072582417699616901995530249937735219099786758954892534365835235843156112799728164123461219817343904782402517111603206575330527850752564642995318064985900815557979945885931124351303252811255254295797082281946658798705979077492469849644183166585950844953164726896146168297808178398470451561320526180542310840744843107469368959707726836608471817060598771730170755446473440774031371227437651048421606224757527085958515947273151027400662948161111284777828103531499488913672800783167888051177155427285103861736658069404797695900758820465238673970882660162285107599221418743657006872537842677883708807515850397691812433880561772652364847297019508025848964833883225165668986935081274596293983121864046277268590401580209059988500511262470167150495261908136688693861324081559046336288963037090312033522400722360882494928182809075406914319957044927504420797278117837677431446979085756432990753582588102440240611039084516401089948868433353748444104639734074519165067632941419347985624435567342072815910754484123812917487312938280670403228188813003978384081332242484646571417574404852962675165616101527367425654869508712001788393846171780457455963045764943565964887518396481296159902471996735508854292964536796779404377230965723361625182030798297734785854606060323419091646711138678490928840107449923456834763763114226000770316931243666699425694828181155048843161380832067845480569758457751090640996007242018255400627276908188082601795520167054701327802366989747082835481105543878446889896230696091881643547476154998574015907396059478684978574180486798918438643164618541351689258379042326487669479733384712996754251703808037828636599654447727795924596382283226723503386540591321268603222892807562509801015765174359627788357881606366119032951829868274617539946921221330284257027058653162292482686679275266764009881985590648534544939224296689791195355783205968492422636277656735338488299104238060289209390654467316291591219712866052661347026855261289381236881063068219249064767086495184176816629077103667131505064964190910450196502178972477361881300608688593782509793781457170396897496908861893034634895715117114601514654381347139092345833472226493656930996045016355808162984965203661519182202145414866559662218796964329217241498105206552200001",
        "Fail on negative exponent": (function () {
            try {
                bigInt("12e-5");
                return false;
            } catch (e) {
                return true;
            }
        })(),
        "Fail on divide by zero": (function () {
            try {
                bigInt("135346").divide("0");
                return false;
            } catch (e) {
                return true;
            }
        })(),
        "Fail on invalid character in number": (function () {
            try {
                bigInt("43a34");
                return false;
            } catch (e) {
                return true;
            }
        })(),
        "0xFF = 255": bigInt("FF", 16).equals(255),
        "negabinary 111100001111 = -1285": bigInt("111100001111", -2).equals(-1285),
        "'<5><10>35<75><44><88><145735>' in base -154654987 = -10580775516023906041313915824083789618333601575504631498551": bigInt("<5><10>35<75><44><88><145735>", bigInt(-154654987)).equals("-10580775516023906041313915824083789618333601575504631498551"),
        "0 * -1 toString is 0": bigInt(0).multiply(-1).toString() === "0", // see Issue 13
        "2e7 = 2E7": bigInt("2e7").equals("2E7"),
        "-1 base 16 = -1 base 10": bigInt("-1", 16).equals("-1"), // see pull request 15
        "65536 squared is 4294967296": bigInt("65536").square().equals("4294967296"),
        "1 is unit": bigInt.one.isUnit(),
        "-1 is unit": bigInt.minusOne.isUnit(),
        "5 is not a unit": !bigInt(5).isUnit(),
        "4^13 (mod 497) = 445": bigInt(4).modPow(13, 497).equals(445),
        "max(77,432) = 432": bigInt.max(77, 432).equals(432),
        "min(32, 19) = 19": bigInt.min(32, 19).equals(19),
        "lcm(21,6)=42": bigInt.lcm(21, 6).equals(42),
        "gcd(42,56)=14": bigInt.gcd(42, 56).equals(14),
        "999 is divisible by 333": bigInt(999).isDivisibleBy(333),
        "7919 is prime": bigInt(7919).isPrime(),
        "7917 is not prime": !bigInt(7917).isPrime(),
        "(0/1) + -100 = -100": (bigInt("0")).divide(bigInt("1")).add(bigInt("-100")).toString() === "-100", // see pull request 16
        "dec 366900685503779409298642816707647664013657589336 = hex 4044654fce69424a651af2825b37124c25094658": bigInt("366900685503779409298642816707647664013657589336").toString(16) === "4044654fce69424a651af2825b37124c25094658",
        "secretmessage000 converts to and from base -36": bigInt("secretmessage000", -36).toString(-36) === "secretmessage000",
        "-256 == -100 base 16": bigInt(-256).toString(16) === "-100",
        "256 in base 1 has 256 ones": bigInt(256).toString(1).length === 256,
        "1.34e2 == 134": bigInt("1.34e2").equals(134),
        "1.7976931348623157e+308": bigInt("1.7976931348623157e+308").equals("17976931348623157000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
        // Bit operations
        "1024 << 100 = 1298074214633706907132624082305024": bigInt(1024).shiftLeft(100).equals("1298074214633706907132624082305024"),
        "2596148429267413814265248164610049 >> 100 = 2048": bigInt("2596148429267413814265248164610049").shiftRight(100).equals(2048),
        "8589934592 >> -50 = 9671406556917033397649408": bigInt("8589934592").shiftRight(-50).equals("9671406556917033397649408"),
        "38685626227668133590597632 << -50 = 34359738368": bigInt("38685626227668133590597632").shiftLeft(-50).equals("34359738368"),
        "435783453 & 902345074 = 298352912": bigInt("435783453").and("902345074").equals("298352912"),
        "435783453 | 902345074 = 1039775615": bigInt("435783453").or("902345074").equals("1039775615"),
        "435783453 xor 902345074 = 741422703": bigInt("435783453").xor("902345074").equals("741422703"),
        "not 94981987261387596 = -49133200814468275": bigInt("94981987261387596").not().equals("-49133200814468275")
    });
    return assertions.join("<br>");
})(bigInt);