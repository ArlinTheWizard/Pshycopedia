import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, createContext, useContext } from 'react';
import { ScrollView, Pressable, View, Text, Image, TouchableOpacity,FlatList, Modal,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
const LanguageContext = createContext();
const ThemeContext = createContext();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3;

const getStyles = (theme) =>
  StyleSheet.create({
    submitButton: {
      backgroundColor: theme === 'light' ? '#007BFF' : '#9C27B0',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginVertical: 8,
      width: width * 0.46,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    resetButton: {
      backgroundColor: theme === 'light' ? '#007BFF' : '#9C27B0',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginVertical: 8,
      width: width * 0.46,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#121212',
      padding: 10,
    },
    containerHome: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#121212',
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'light' ? '#333333' : '#E0E0E0',
      marginBottom: 20,
      lineHeight: 32, 
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 19,
      fontWeight: '500', 
      color: theme === 'light' ? '#444444' : '#E0E0E0',
      marginBottom: 12,
      lineHeight: 28,
      fontStyle: 'italic', 
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 16,
      color: theme === 'light' ? '#555555' : '#E0E0E0',
      lineHeight: 24,
      marginBottom: 20,
      fontFamily: 'Roboto', 
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme === 'light' ? '#B0BEC5' : '#34495e',
      paddingVertical: 16,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginVertical: 12,
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    buttonCard: {
      backgroundColor: theme === 'light' ? '#007BFF' : '#9C27B0',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 0,
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: theme === 'light' ? '#007BFF' : '#9C27B0',
    },
    buttonText: {
      color: '#FFFFFF', 
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1.5, 
      textTransform: 'uppercase', 
      textAlign: 'center',
    },
    settingText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme === 'light' ? '#333333' : '#E0E0E0',
      marginBottom: 18,
      textAlign: 'center',
      textShadowColor: theme === 'light' ? '#E0E0E0' : '#333333', 
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 4,
      
    },
    selectedButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    
    card: {
      backgroundColor: theme === 'light' ? '#F7F7F7' : '#1E1E1E',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    infoSection: {
      padding: 18,
      backgroundColor: theme === 'light' ? '#F9F9F9' : '#1E1E1E',
    },
    description: {
      fontSize: 16,
      color: theme === 'light' ? '#666666' : '#AAB7B8',
      lineHeight: 24,
      marginBottom: 12,
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 0,
      marginBottom: 20,
    },
    imageContent: {
      width: width,
      height: 250,
      borderRadius: 0,
      marginBottom: 20,
      marginTop: -20,
      marginLeft: -10,
    },
    imageTitle: {
      width: 50,
      height: 50,
    },
    textTitle: {
      color: theme === 'dark' ? '#fff' : '#000',
    },
    containerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonMargin: {
      marginLeft: 100,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
    correct: {
      backgroundColor: '#28a745',
    },
    incorrect: {
      backgroundColor: '#dc3545',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      opacity: 0.6,
    },
});

const getGalleryStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#F5F6FA' : '#0A0A0C',
      paddingHorizontal: 5,
      paddingTop: 0,
      paddingBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme === 'light' ? '#2A2A3C' : '#D8D9E0',
      marginBottom: 16,
      lineHeight: 32,
      textTransform: 'capitalize',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    grid: {
      paddingHorizontal: 4,
      paddingBottom: 24,
    },
    card: {
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#1C1C22',
      borderRadius: 12,
      margin: 4,
      shadowColor: theme === 'light' ? '#000' : '#4A4A5A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme === 'light' ? 'rgba(200, 200, 220, 0.3)' : 'rgba(100, 100, 120, 0.3)',
      overflow: 'hidden',
    },
    thumbnail: {
      width: imageSize,
      height: imageSize,
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: theme === 'light' ? '#E8E8F0' : '#2A2A30',
    },
    description: {
      fontSize: 11,
      fontWeight: '500',
      color: theme === 'light' ? '#4A4A5A' : '#A8A9B0',
      lineHeight: 16,
      marginTop: 6,
      marginBottom: 6,
      textAlign: 'center',
      paddingHorizontal: 6,
      maxWidth: imageSize,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.96)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 32,
    },
    fullImage: {
      width: width - 48,
      height: (width - 48) * 1.3,
      maxHeight: Dimensions.get('window').height * 0.75,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#FFFFFF' : '#2A2A30',
    },
});

const HomeScreen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const styles = StyleSheet.create({
    ...getStyles(theme),
    searchContainer: {
      marginVertical: 10,
      marginHorizontal: 0,
      backgroundColor: theme === 'light' ? '#F0F0F0' : '#2A2A2A',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: theme === 'light' ? '#333333' : '#E0E0E0',
    },
  });

  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const cards = [
    {
      id: 1,
      image: require('../assets/images/sanatate_pg2.jpg'),
      title: {
        ro: 'Sănătatea mintală în adolescență',
        en: 'Mental Health in Adolescence',
      },
      description: {
        ro: 'Cum afectează factorii contemporani starea emoțională a tinerilor?',
        en: 'How do contemporary factors affect the emotional state of young people?',
      },
      navigateTo: 'page2',
    },
    {
      id: 2,
      image: require('../assets/images/chestionar1.jpg'),
      title: {
        ro: 'Chestionar sănătatea mintală în adolescență',
        en: 'Quiz Mental Health in Adolescence',
      },
      description: {
        ro: 'Testează-ți cunoștințele despre sănătatea mintală în adolescență!',
        en: 'Test Your Knowledge About Mental Health in Adolescence!',
      },
      navigateTo: 'quiz1',
    },
    {
      id: 3,
      image: require('../assets/images/sanatate_pg3.jpg'),
      title: {
        ro: 'Competiția și complexitatea comparării',
        en: 'Competition and the Complexity of Comparison',
      },
      description: {
        ro: 'Cum se măsoară adolescenții unii față de alții?',
        en: 'How do adolescents measure themselves against each other?',
      },
      navigateTo: 'page3',
    },
    {
      id: 4,
      image: require('../assets/images/chestionar2.jpg'),
      title: {
        ro: 'Chestionar competiția și complexitatea comparării',
        en: 'Quiz Competition and the Complexity of Comparison',
      },
      description: {
        ro: 'Testează-ți cunoștințele despre competiția și complexitatea comparării!',
        en: 'Test Your Knowledge About Competition and the Complexity of Comparison!',
      },
      navigateTo: 'quiz2',
    },
    {
      id: 5,
      image: require('../assets/images/sanatate_pg4.jpg'),
      title: {
        ro: 'Perfecțiunea virtuală',
        en: 'Virtual Perfection',
      },
      description: {
        ro: 'Cum imaginea unui adolescent idealizat din media modelează realitatea?',
        en: 'How does the image of an idealized adolescent from the media shape reality?',
      },
      navigateTo: 'page4',
    },
    {
      id: 6,
      image: require('../assets/images/chestionar3.jpg'),
      title: {
        ro: 'Chestionar perfecțiunea virtuală',
        en: 'Quiz Virtual Perfection',
      },
      description: {
        ro: 'Testează-ți cunoștințele despre perfecțiunea virtuală!',
        en: 'Test Your Knowledge About Virtual Perfection!',
      },
      navigateTo: 'quiz3',
    },
    {
      id: 7,
      image: require('../assets/images/sanatate_pg5.jpg'),
      title: {
        ro: 'Mâncatul sau controlul?',
        en: 'Eating or Control?',
      },
      description: {
        ro: 'Cum influențează cultura dietetică sănătatea mintală a adolescentelor?',
        en: 'How does diet culture influence the mental health of adolescent girls?',
      },
      navigateTo: 'page5',
    },
    {
      id: 8,
      image: require('../assets/images/chestionar4.jpg'),
      title: {
        ro: 'Chestionar mâncatul sau controlul',
        en: 'Quiz Eating or Control',
      },
      description: {
        ro: 'Testează-ți cunoștințele despre mâncat sau control!',
        en: 'Test Your Knowledge About Eating or Control!',
      },
      navigateTo: 'quiz4',
    },
    {
      id: 9,
      image: require('../assets/images/sanatate_pg6.jpg'),
      title: {
        ro: 'Reconstruirea imaginii de sine',
        en: 'Rebuilding the Self-Image',
      },
      description: {
        ro: 'Terapia și procesul de acceptare a corpului adolescentului',
        en: 'Therapy and the process of body acceptance in adolescents',
      },
      navigateTo: 'page6',
    },
    {
      id: 10,
      image: require('../assets/images/chestionar5.jpg'),
      title: {
        ro: 'Chestionar reconstruirea imaginii de sine',
        en: 'Quiz Rebuilding the Self-Image',
      },
      description: {
        ro: 'Testează-ți cunoștințele despre reconstruirea imaginii de sine!',
        en: 'Test Your Knowledge About Rebuilding the Self-Image!',
      },
      navigateTo: 'quiz5',
    },
    {
      id: 11,
      image: require('../assets/images/gallery.jpg'),
      title: {
        ro: 'Galerie Foto',
        en: 'Photo Gallery',
      },
      description: {
        ro: 'Imagini despre psihicul tinerilor',
        en: 'Images about young people’s psyche',
      },
      navigateTo: 'gallery1',
    },
  ];

  const filteredCards = cards.filter(card =>
    normalizeString(card.title[language]).includes(normalizeString(searchQuery))
  );

  return (
    <ScrollView style={styles.containerHome}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={language === 'ro' ? 'Caută...' : 'Search...'}
          placeholderTextColor={theme === 'light' ? '#666666' : '#AAB7B8'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel={language === 'ro' ? 'Căutare' : 'Search'}
        />
      </View>

      {filteredCards.length === 0 ? (
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          {language === 'ro' ? 'Niciun rezultat găsit' : 'No results found'}
        </Text>
      ) : (
        filteredCards.map(card => (
          <View key={card.id} style={styles.card}>
            <Image source={card.image} style={styles.image} />
            <View style={styles.infoSection}>
              <Text style={styles.title}>{card.title[language]}</Text>
              <Text style={styles.description}>{card.description[language]}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(card.navigateTo)}
              style={styles.buttonCard}
            >
              <Text style={styles.buttonText}>
                {language === 'ro' ? 'Arătați mai mult' : 'Show More'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <Text style={{marginBottom:20}}></Text>
    </ScrollView>
  );
};

const Page2Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/sanatate_pg2.jpg')}
        style={styles.imageContent}
        resizeMode="cover"
      />
      {language === 'ro' ? (
        <>
          <Text style={styles.paragraph}>
            Sănătatea mintală a adolescentului contemporan este influențată de o
            sumedenie de factori, care afectează profund starea emoțională a
            tinerilor, lăsându-și amprenta în viețile adulților în devenire ai
            secolului XXI.
          </Text>
          <Text style={styles.paragraph}>
            Printre cele mai comune probleme se numără stresul legat de
            performanța școlară, presiunile sociale și incertitudinea legată de
            viitor. Adolescenții se confruntă, de asemenea, cu un sentiment crescut
            de anxietate, adesea înrădăcinat în cerințele ridicate din partea
            părinților sau a colegilor, numit și peer pressure. Odată cu apariția
            oricărei forme de anxietate, adolescenții adesea devin tentați să
            găsească modalități accesibile prin care să-și gestioneze trăirile
            (coping mechanisms). Unul din cele mai comune “scăpări” este chiar
            utilizarea platformelor sociale.
          </Text>
          <Text style={styles.paragraph}>
            Creând o dualitate complex nemaiîntâlnită la alte generații, în prima
            extremitate, platformele online pot oferi tinerilor oportunități de a
            interacționa, de a-și exprima ideile și de a-și croi realități noi. În
            contextul prezentat, adolescentul poate deveni asemenea unui burete,
            absorbind informația din toate sursele de care dispune.
          </Text>
          <Text style={styles.paragraph}>
            La polul opus, însă, expunerea constantă la imagini și standarde
            nerealiste poate duce la o scădere a stimei de sine și poate contribui
            la sentimente de inadecvare și comparație. Astfel, un tânăr expus
            constant unei așa-zise “vieți ideale” este nesatisfăcut cu cotidianul
            său, fără a se mai bucura de micile plăceri care se pitesc în colțurile
            fiecărei zile.
          </Text>
          <Text style={styles.paragraph}>
            Balanța dintre beneficiile și pericolele social media devine crucial
            pentru sănătatea mintală a adolescenților. Aceștia trebuie să învețe
            cum să își gestioneze interacțiunile online într-un mod sănătos,
            obiectiv pe care aplicația noastră îl are în vedere!
          </Text>
          <Text style={styles.space}></Text>
        </>
      ) : (
        <>
          <Text style={styles.paragraph}>
            The mental health of today’s adolescents is influenced by a multitude
            of factors that deeply affect their emotional well-being, leaving a
            lasting mark on the future adults of the 21st century.
          </Text>
          <Text style={styles.paragraph}>
            Among the most common issues are stress related to academic
            performance, social pressures, and uncertainty about the future.
            Teenagers also face an increased sense of anxiety, often rooted in the
            high expectations from parents or peers, also known as peer pressure.
            When experiencing anxiety, adolescents often seek accessible ways to
            cope with their emotions. One of the most common “escapes” is, in fact,
            the use of social media platforms.
          </Text>
          <Text style={styles.paragraph}>
            Creating a complex duality unlike any previous generation, on one hand,
            online platforms can offer young people opportunities to interact,
            express their ideas, and shape new realities. In this context, the
            adolescent can become like a sponge, absorbing information from every
            available source.
          </Text>
          <Text style={styles.paragraph}>
            On the other hand, however, constant exposure to unrealistic images and
            standards can lead to lower self-esteem and contribute to feelings of
            inadequacy and comparison. Thus, a young person who is constantly
            exposed to a so-called “perfect life” becomes dissatisfied with their
            own daily life, unable to enjoy the small pleasures hidden in the
            corners of each day.
          </Text>
          <Text style={styles.paragraph}>
            Balancing the benefits and dangers of social media becomes crucial for
            the mental health of adolescents. They must learn how to manage their
            online interactions in a healthy way, an objective that our app aims to
            support!
          </Text>
          <Text style={styles.space}></Text>
        </>
      )}
      <Text style={{marginBottom:10}}></Text>
    </ScrollView>
  );
};

const Page3Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/sanatate_pg3.jpg')}
        style={styles.imageContent}
        resizeMode="cover"
      />
      {language === 'ro' ? (
        <>
          <Text style={styles.paragraph}>
            Adolescenții se confruntă cu o presiune constantă de a se compara cu
            ceilalți, în special din cauza rețelelor sociale, care promovează
            imagini idealizate ale vieților altora. Aceasta poate duce la
            sentimente de inferioritate și la o stimă de sine scăzută. Mulți
            adolescenți își definesc valoarea prin realizările lor, cum ar fi
            succesul școlar, performanțele sportive sau aspectul fizic. Această
            asociere între identitate și succesul extern poate genera o presiune
            constantă.
          </Text>
          <Text style={styles.paragraph}>
            Într-o societate unde tendințele sunt adesea dictate de grupuri sau
            influenceri, adolescenții se pot simți obligați să urmeze norme
            externe, ceea ce le limitează originalitatea și creativitatea. Teama de
            a fi diferit sau exclus este puternică în această perioadă a vieții,
            iar dorința de a aparține unui grup social poate duce la conformare.
            Toate acestea rezultă în viitori adulți cărora le va fi frică să iasă
            din tipare și să se exprime liber.
          </Text>
          <Text style={styles.paragraph}>
            Mai mult decât atât, efectul de turmă poate avea atât efecte pozitive,
            prin crearea unui sentiment de apartenență, cât și negative.
            Adolescenții pot face alegeri riscante doar pentru a se încadra în
            așteptările grupului de prieteni. Fiind accentuat de comportamente
            dăunătoare, așa-zisul efect de turmă îl poate purta în alte extreme,
            cum ar fi bullying-ul sau abuzul de substanțe.
          </Text>
          <Text style={styles.paragraph}>
            În concluzie, competiția și presiunea de a se compara în adolescență
            pot afecta grav dezvoltarea emoțională a tinerilor. Este esențial să
            învățăm să apreciem valoarea autentică a fiecărei persoane, fără a o
            măsura doar prin succesul extern.
          </Text>
          <Text style={styles.space}></Text>
        </>
      ) : (
        <>
          <Text style={styles.paragraph}>
            Teenagers face constant pressure to compare themselves with others,
            especially due to social media, which promotes idealized images of
            other people’s lives. This can lead to feelings of inferiority and low
            self-esteem. Many teenagers define their worth through their
            achievements, such as academic success, sports performance, or
            physical appearance. This association between identity and external
            success can create constant pressure.
          </Text>
          <Text style={styles.paragraph}>
            In a society where trends are often dictated by groups or influencers,
            teenagers may feel compelled to follow external norms, limiting their
            originality and creativity. The fear of being different or excluded is
            strong during this stage of life, and the desire to belong to a social
            group can lead to conformity. All of this results in future adults who
            may fear stepping out of the mold and expressing themselves freely.
          </Text>
          <Text style={styles.paragraph}>
            Moreover, the herd mentality can have both positive effects, creating a
            sense of belonging, and negative effects. Teenagers may make risky
            choices just to fit in with the expectations of their friend group.
            Amplified by harmful behaviors, the so-called herd mentality can lead
            to other extremes, such as bullying or substance abuse.
          </Text>
          <Text style={styles.paragraph}>
            In conclusion, competition and the pressure to compare during
            adolescence can severely affect the emotional development of young
            people. It is essential to learn to appreciate the authentic value of
            each person, without measuring it solely by external success.
          </Text>
          <Text style={styles.space}></Text>
        </>
      )}
      <Text style={{marginBottom:10}}></Text>
    </ScrollView>
  );
};

const Page4Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/sanatate_pg4.jpg')}
        style={styles.imageContent}
        resizeMode="cover"
      />
      {language === 'ro' ? (
        <>
          <Text style={styles.paragraph}>
            Rețelele sociale și media în general promovează imagini de viață
            idealizate, care creează o presiune puternică asupra adolescenților
            pentru a se conforma unor standarde nerealiste. Aceste platforme sunt
            pline de imagini perfecte cu vacanțe de vis, corpuri ideale și
            realizări spectaculoase, dar, de cele mai multe ori, ceea ce vedem nu
            reflectă realitatea. În majoritatea cazurilor, este vorba despre
            imagini prezentate într-un context care nu corespunde vieții
            cotidiene.
          </Text>
          <Text style={styles.paragraph}>
            Adolescenții sunt adesea influențați de concepte precum „F.O.M.O.”
            (teama de a rata ceva) și „Y.O.L.O.” (trăiești o singură dată), care
            îi împing să participe la tot ce este „cool” și să se angajeze în
            activități impulsive sau riscante. Aceste concepte creează o presiune
            constantă de a trăi intens și de a nu rata nicio experiență, chiar
            dacă uneori nu sunt în concordanță cu realitatea sau cu raționalul.
          </Text>
          <Text style={styles.paragraph}>
            Această comparare constantă cu „viața perfectă” din online duce adesea
            la o lipsă de satisfacție cu viața de zi cu zi. Adolescenții pot
            ajunge să simtă că nu trăiesc la fel de intens sau nu au aceleași
            oportunități ca cei pe care îi urmăresc în filme și seriale, dar și
            din spatele unui ecran, ceea ce le afectează stima de sine și
            perspectiva asupra realității.
          </Text>
          <Text style={styles.paragraph}>
            În plus, imaginea unui adolescent idealizat promovată prin filme,
            seriale și social media nu reflectă realitatea din multe țări
            balcanice, inclusiv din România. Acești adolescenți sunt înfățișați
            trăind într-un mediu perfect, cu acces la tehnologie de ultimă oră și
            oportunități nelimitate, un ideal care nu corespunde cu realitatea
            economico-socială a multora.
          </Text>
          <Text style={styles.space}></Text>
        </>
      ) : (
        <>
          <Text style={styles.paragraph}>
            Social media and the media, in general, promote idealized images of
            life, creating significant pressure on teenagers to conform to
            unrealistic standards. These platforms are full of perfect pictures
            with dream vacations, ideal bodies, and spectacular achievements, but
            most of the time, what we see doesn't reflect reality. In most cases,
            it's about images presented in a context that doesn't match everyday
            life.
          </Text>
          <Text style={styles.paragraph}>
            Teenagers are often influenced by concepts like "F.O.M.O." (fear of
            missing out) and "Y.O.L.O." (you only live once), which push them to
            participate in everything that is "cool" and engage in impulsive or
            risky activities. These concepts create constant pressure to live
            intensely and not miss any experience, even if sometimes they don't
            align with reality or rational thinking.
          </Text>
          <Text style={styles.paragraph}>
            This constant comparison with the "perfect life" online often leads to
            a lack of satisfaction with daily life. Teenagers may feel like
            they're not living as intensely or don’t have the same opportunities
            as those they follow in movies, TV shows, or even behind a screen,
            which affects their self-esteem and their perspective on reality.
          </Text>
          <Text style={styles.paragraph}>
            Moreover, the image of an idealized teenager promoted through movies,
            TV shows, and social media doesn't reflect the reality in many Balkan
            countries, including Romania. These teenagers are portrayed as living
            in a perfect environment, with access to the latest technology and
            unlimited opportunities, an ideal that doesn't match the economic and
            social reality for many.
          </Text>
          <Text style={styles.space}></Text>
        </>
      )}
      <Text style={{marginBottom:10}}></Text>
    </ScrollView>
  );
};

const Page5Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/sanatate_pg5.jpg')}
        style={styles.imageContent}
        resizeMode="cover"
      />
      {language === 'ro' ? (
        <>
          <Text style={styles.paragraph}>
            Într-o lume în care rețelele sociale dictează standardele de frumusețe,
            adolescentele se confruntă zilnic cu presiunea de a arăta într-un
            anumit fel. Imaginile perfect editate, promovarea unui „ideal” corporal
            și dietele care promit rezultate miraculoase contribuie la o relație
            tot mai nesănătoasă cu propriul corp. Dar cât de mult afectează această
            cultură dietetică sănătatea mintală a adolescentelor? Și, mai ales,
            cum pot acestea să navigheze printr-o societate obsedată de controlul
            greutății?
          </Text>
          <Text style={styles.paragraph}>
            Instagram, TikTok și alte platforme sunt pline de influenceri care
            promovează corpuri tonifiate, abdomene sculptate și diete „minune”.
            Deși poate părea inofensiv, acest bombardament vizual creează
            așteptări nerealiste și un sentiment constant de comparație.
            Adolescentele ajung să își măsoare valoarea în funcție de numărul de
            like-uri, de centimetrii din talie sau de kilogramele afișate pe
            cântar. Astfel, frumusețea devine un obiectiv greu de atins, iar
            fiecare imperfecțiune este percepută ca un eșec.
          </Text>
          <Text style={styles.paragraph}>
            Pentru a se conforma acestor standarde, multe adolescente recurg la
            di  diete drastice sau își impun restricții alimentare severe.
            Elimină carbohidrații, numără obsesiv caloriile sau urmează regimuri
            extreme promovate pe internet. Problema este că aceste obiceiuri nu
            doar că nu garantează rezultate pe termen lung, dar pot duce la
            deficiențe nutriționale, oboseală cronică și probleme de concentrare.
            În plus, când mâncarea devine un inamic, apare un sentiment de
            vinovăție la fiecare abatere, iar bunăstarea mintală scade treptat.
            Ulterior, o stimă de sine scăzută poate duce la anxietate, depresie și
            chiar izolare socială.
          </Text>
          <Text style={styles.paragraph}>
            Pentru unele adolescente, presiunea socială și dorința de control
            asupra propriului corp pot escalada în probleme grave, precum anorexia,
            bulimia sau mâncatul compulsiv. Aceste tulburări nu sunt doar despre
            mâncare, ci și despre emoții, frică și dorința de a se simți
            acceptate. De aceea, este esențial ca părinții, profesorii și
            societatea, în general, să recunoască semnele și să intervină la timp.
            Cultura dietetică a transformat mâncarea dintr-o necesitate într-o
            obsesie, iar corpul într-un proiect care trebuie constant îmbunătățit.
            Însă adevărata frumusețe nu stă în centimetri sau kilograme, ci în
            sănătatea fizică și emoțională.
          </Text>
          <Text style={styles.space}></Text>
        </>
      ) : (
        <>
          <Text style={styles.paragraph}>
            In a world where social media dictates beauty standards, teenage girls
            face daily pressure to look a certain way. Perfectly edited images, the
            promotion of a “body ideal,” and diets that promise miraculous results
            contribute to an increasingly unhealthy relationship with their own
            bodies. But how much does this diet culture affect the mental health of
            teen girls? And, more importantly, how can they navigate a society
            obsessed with weight control?
          </Text>
          <Text style={styles.paragraph}>
            Instagram, TikTok, and other platforms are filled with influencers
            promoting toned bodies, sculpted abs, and “miracle” diets. While it
            may seem harmless, this visual bombardment creates unrealistic
            expectations and a constant feeling of comparison. Teen girls end up
            measuring their value based on the number of likes, waist centimeters,
            or the weight shown on the scale. As a result, beauty becomes a
            hard-to-reach goal, and every imperfection is perceived as a failure.
          </Text>
          <Text style={styles.paragraph}>
            To conform to these standards, many teen girls resort to drastic diets
            or impose severe food restrictions on themselves. They eliminate
            carbohydrates, obsessively count calories, or follow extreme regimens
            promoted on the internet. The problem is that these habits not only
            fail to guarantee long-term results, but they can also lead to
            nutritional deficiencies, chronic fatigue, and concentration problems.
            Additionally, when food becomes an enemy, guilt arises with every
            deviation, and mental well-being gradually declines. Subsequently, low
            self-esteem can lead to anxiety, depression, and even social isolation.
          </Text>
          <Text style={styles.paragraph}>
            For some teenage girls, social pressure and the desire for control over
            their own bodies can escalate into serious problems like anorexia,
            bulimia, or compulsive eating. These disorders are not just about food
            but also about emotions, fear, and the desire to feel accepted. That’s
            why it’s essential for parents, teachers, and society in general to
            recognize the signs and intervene on time. Diet culture has turned food
            from a necessity into an obsession, and the body into a project that
            must constantly be improved. However, true beauty is not measured in
            centimeters or kilograms but in physical and emotional health.
          </Text>
          <Text style={styles.space}></Text>
        </>
      )}
      <Text style={{marginBottom:10}}></Text>
    </ScrollView>
  );
};

const Page6Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/sanatate_pg6.jpg')}
        style={styles.imageContent}
        resizeMode="cover"
      />
      {language === 'ro' ? (
        <>
          <Text style={styles.paragraph}>
            Adolescența este o perioadă plină de schimbări, iar presiunea socială
            asupra aspectului fizic poate afecta profund încrederea în sine.
            Rețelele sociale, comentariile negative și standardele impuse de
            societate îi fac pe mulți tineri să își privească propriul corp cu
            nemulțumire. Totuși, prin conștientizare, educație și sprijin
            emoțional, adolescenții pot învăța să își accepte și să își aprecieze
            corpul.
          </Text>
          <Text style={styles.paragraph}>
            Primul pas spre o imagine de sine sănătoasă este conștientizarea
            faptului că fiecare corp este unic și că schimbările din adolescență
            sunt normale. În loc să se compare cu alții, tinerii ar trebui să își
            recunoască și să își valorifice propriile calități. Discuțiile cu
            persoane de încredere – familie, profesori sau specialiști – pot ajuta
            la formarea unei perspective realiste asupra corpului.
          </Text>
          <Text style={styles.paragraph}>
            Rețelele sociale promovează adesea standarde de frumusețe nerealiste,
            ceea ce poate duce la frustrare și nemulțumire. Adolescenții trebuie să
            învețe să privească critic conținutul online, să evite comparațiile
            toxice și să urmărească creatori care promovează diversitatea corporală
            și acceptarea de sine.
          </Text>
          <Text style={styles.paragraph}>
            Mișcarea, alimentația sănătoasă și somnul regulat sunt esențiale nu
            doar pentru sănătatea fizică, ci și pentru bunăstarea emoțională.
            Activitățile sportive sau recreative practicate din plăcere, nu din
            obligație, contribuie la o relație mai armonioasă cu propriul corp.
            Așadar, acceptarea corpului nu înseamnă conformare la standardele
            impuse, ci respect și apreciere pentru propriul sine.
          </Text>
          <Text style={styles.space}></Text>
        </>
      ) : (
        <>
          <Text style={styles.paragraph}>
            Adolescence is a time of many changes, and societal pressure regarding
            physical appearance can deeply affect self-confidence. Social media,
            negative comments, and societal standards make many young people view
            their own bodies with dissatisfaction. However, through awareness,
            education, and emotional support, teens can learn to accept and
            appreciate their bodies.
          </Text>
          <Text style={styles.paragraph}>
            The first step toward a healthy self-image is realizing that every body
            is unique, and that changes during adolescence are normal. Instead of
            comparing themselves to others, young people should recognize and value
            their own qualities. Conversations with trusted people – family,
            teachers, or professionals – can help form a realistic perspective on
            the body.
          </Text>
          <Text style={styles.paragraph}>
            Social media often promotes unrealistic beauty standards, which can
            lead to frustration and dissatisfaction. Teens need to learn to
            critically assess online content, avoid toxic comparisons, and follow
            creators who promote body diversity and self-acceptance.
          </Text>
          <Text style={styles.paragraph}>
            Exercise, healthy eating, and regular sleep are essential not only for
            physical health but also for emotional well-being. Sports or
            recreational activities done for pleasure, not out of obligation,
            contribute to a more harmonious relationship with one's body. Thus,
            body acceptance doesn't mean conforming to imposed standards, but
            showing respect and appreciation for oneself.
          </Text>
          <Text style={styles.space}></Text>
        </>
      )}
      <Text style={{marginBottom:10}}></Text>
    </ScrollView>
  );
};

const Quiz1Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: language === 'ro' ? 'Ce influențează sănătatea mintală a adolescentului contemporan?' : 'What influences the mental health of today’s teenager?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Regulile stricte din familie' : 'Strict family rules',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu menționează regulile familiale ca influență principală.',
            en: 'Incorrect. The text does not mention family rules as a primary influence.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Relațiile de prietenie din școală' : 'School friendships',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Este doar un factor posibil, dar textul face referire la o gamă largă de influențe.',
            en: 'Incorrect. It’s only one possible factor, but the text refers to a wide range of influences.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'O varietate de factori complecși' : 'A variety of complex factors',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Paragraful introductiv subliniază clar că sănătatea mintală este afectată de „o sumedenie de factori”.',
            en: 'Correct. The introductory paragraph clearly emphasizes that mental health is affected by “a multitude of factors.”'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Doar un stil de viață sănătos' : 'Only a healthy lifestyle',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Un stil de viață sănătos ajută, dar nu este singurul aspect menționat.',
            en: 'Incorrect. A healthy lifestyle helps, but it’s not the only aspect mentioned.'
          }
        }
      ]
    },
    {
      id: 2,
      text: language === 'ro' ? 'Care sunt unele dintre problemele emoționale frecvente la adolescenți?' : 'What are some common emotional problems among teenagers?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Neînțelegerile cu profesorii' : 'Misunderstandings with teachers',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Acestea nu sunt menționate explicit.',
            en: 'Incorrect. These are not explicitly mentioned.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Presiunea performanței și stresul social' : 'Performance pressure and social stress',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul indică stresul școlar și presiunile sociale ca probleme frecvente.',
            en: 'Correct. The text indicates academic stress and social pressures as common issues.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Lipsa accesului la internet' : 'Lack of internet access',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Internetul nu este indicat ca sursă de problemă în acest context.',
            en: 'Incorrect. The internet is not indicated as a source of problems in this context.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Teama de maturizare' : 'Fear of growing up',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu vorbește despre frica de a deveni adult.',
            en: 'Incorrect. The text does not discuss the fear of becoming an adult.'
          }
        }
      ]
    },
    {
      id: 3,
      text: language === 'ro' ? 'De ce apelează unii adolescenți la rețelele sociale în momente dificile?' : 'Why do some teenagers turn to social media during difficult times?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Pentru a se compara cu ceilalți' : 'To compare themselves with others',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Compararea apare ca efect negativ, nu ca motivație.',
            en: 'Incorrect. Comparison is mentioned as a negative effect, not a motivation.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Pentru a accesa informații educaționale' : 'To access educational information',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Acest aspect nu este menționat în contextul anxietății.',
            en: 'Incorrect. This aspect is not mentioned in the context of anxiety.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Pentru a găsi modalități accesibile de a face față emoțiilor' : 'To find accessible ways to cope with emotions',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul spune clar că social media este una dintre metodele cele mai comune de “scăpare” emoțională.',
            en: 'Correct. The text clearly states that social media is one of the most common methods of emotional “escape.”'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Pentru a evita familia' : 'To avoid family',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Relațiile familiale nu sunt indicate ca motiv de evitare.',
            en: 'Incorrect. Family relationships are not indicated as a reason for avoidance.'
          }
        }
      ]
    },
    {
      id: 4,
      text: language === 'ro' ? 'Ce efecte are expunerea constantă la imagini idealizate online?' : 'What effects does constant exposure to idealized online images have?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Crește încrederea în sine' : 'Increases self-confidence',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul vorbește despre efecte negative asupra stimei de sine.',
            en: 'Incorrect. The text discusses negative effects on self-esteem.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Îmbunătățește gândirea critică' : 'Improves critical thinking',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este menționat niciun astfel de beneficiu în text.',
            en: 'Incorrect. No such benefit is mentioned in the text.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Poate reduce stima de sine și duce la comparație negativă' : 'Can reduce self-esteem and lead to negative comparison',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Paragraful patru subliniază aceste efecte asupra tinerilor.',
            en: 'Correct. The fourth paragraph highlights these effects on young people.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Motivează adolescenții să studieze mai mult' : 'Motivates teenagers to study harder',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu face nicio legătură cu performanța academică.',
            en: 'Incorrect. The text makes no connection to academic performance.'
          }
        }
      ]
    },
    {
      id: 5,
      text: language === 'ro' ? 'Ce trebuie să învețe adolescenții în legătură cu prezența lor online?' : 'What should teenagers learn about their online presence?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Cum să evite complet tehnologia' : 'How to completely avoid technology',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este vorba de evitare, ci de echilibru.',
            en: 'Incorrect. It’s not about avoidance but about balance.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Cum să urmărească comportamentele celorlalți' : 'How to follow others’ behaviors',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este un obiectiv sănătos și nici recomandat în text.',
            en: 'Incorrect. This is not a healthy goal nor recommended in the text.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Cum să-și gestioneze interacțiunile online într-un mod sănătos' : 'How to manage their online interactions in a healthy way',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Ultimul paragraf spune clar că trebuie să învețe gestionarea echilibrată a social media.',
            en: 'Correct. The final paragraph clearly states that they must learn balanced management of social media.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Cum să aibă mai mulți urmăritori' : 'How to gain more followers',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu susține această abordare superficială.',
            en: 'Incorrect. The text does not support this superficial approach.'
          }
        }
      ]
    }
  ];

  const handleAnswerPress = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.card}>
          <Text style={{marginBottom:0}}></Text>
          <Text style={styles.title}>
            {language === 'ro' ? `Întrebare ${question.id}` : `Question ${question.id}`}
          </Text>
          <Text style={styles.subtitle}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.button,
                  answers[question.id]?.id === option.id && styles.selectedButton,
                  submitted && option.isCorrect && styles.correct,
                  submitted && answers[question.id]?.id === option.id && !option.isCorrect && styles.incorrect
                ]}
                onPress={() => handleAnswerPress(question.id, option)}
                disabled={submitted}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.id]?.id === option.id && styles.selectedButtonText
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {submitted && (
            <Text style={styles.description}>
              {answers[question.id]?.feedback[language]}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!allQuestionsAnswered || submitted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!allQuestionsAnswered || submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Trimite' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, !submitted && styles.disabledButton]}
          onPress={handleReset}
          disabled={!submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Resetează' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginBottom:25}}></Text>
    </ScrollView>
  );
};

const Quiz2Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: language === 'ro' ? 'Ce efect are compararea constantă cu ceilalți asupra adolescenților?' : 'What effect does constant comparison with others have on teenagers?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Îi face mai competitivi și încrezători' : 'Makes them more competitive and confident',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Deși competiția poate uneori stimula performanța, textul evidențiază că această comparație duce mai degrabă la sentimente de inferioritate, nu la încredere în sine.',
            en: 'Incorrect. While competition can sometimes boost performance, the text highlights that comparison leads to feelings of inferiority, not confidence.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Le scade încrederea în sine' : 'Lowers their self-confidence',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul spune clar că această presiune de comparație „poate duce la sentimente de inferioritate și la o stimă de sine scăzută.”',
            en: 'Correct. The text clearly states that this pressure to compare “can lead to feelings of inferiority and low self-esteem.”'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Le oferă un model de succes' : 'Provides a model of success',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Deși poate părea așa, textul nu susține acest lucru. Imaginea vieților altora este idealizată și nerealistă.',
            en: 'Incorrect. Although it may seem so, the text doesn’t support this. The image of others’ lives is idealized and unrealistic.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Îi motivează să muncească mai mult' : 'Motivates them to work harder',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Motivația nu este menționată ca efect pozitiv în acest context, ci mai degrabă o presiune negativă.',
            en: 'Incorrect. Motivation isn’t mentioned as a positive effect in this context, but rather a negative pressure.'
          }
        }
      ]
    },
    {
      id: 2,
      text: language === 'ro' ? 'Cum își definesc mulți adolescenți propria valoare?' : 'How do many teenagers define their own worth?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Prin calități personale precum empatia' : 'Through personal qualities like empathy',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Ar fi ideal, dar textul spune că ei se bazează pe succesul vizibil, nu pe trăsături interioare.',
            en: 'Incorrect. That would be ideal, but the text says they rely on visible success, not inner qualities.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Prin sprijinul primit de la familie' : 'Through support received from family',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Sprijinul familiei nu este menționat ca reper în definirea valorii de sine.',
            en: 'Incorrect. Family support isn’t mentioned as a benchmark for defining self-worth.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Prin realizări vizibile și validare externă' : 'Through visible achievements and external validation',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul spune clar că mulți își „definesc valoarea prin realizările lor, cum ar fi succesul școlar, performanțele sportive sau aspectul fizic.”',
            en: 'Correct. The text clearly states that many “define their worth through their achievements, such as academic success, sports performance, or physical appearance.”'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Prin prietenii apropiate și loialitate' : 'Through close friendships and loyalty',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Deși prietenia e importantă, nu este menționată ca sursă de validare a valorii personale în acest text.',
            en: 'Incorrect. Although friendship is important, it’s not mentioned as a source of personal worth validation in this text.'
          }
        }
      ]
    },
    {
      id: 3,
      text: language === 'ro' ? 'Ce efect are dorința de apartenență la un grup asupra originalității adolescentului?' : 'What effect does the desire to belong to a group have on a teenager’s originality?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Îi ajută să se exprime mai liber' : 'Helps them express themselves more freely',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Din contră, teama de a fi diferit duce la conformism, nu la exprimare liberă.',
            en: 'Incorrect. On the contrary, fear of being different leads to conformity, not free expression.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Nu influențează comportamentul personal' : 'Does not influence personal behavior',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul subliniază clar că dorința de apartenență influențează alegerile și comportamentele.',
            en: 'Incorrect. The text clearly emphasizes that the desire to belong influences choices and behaviors.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Poate limita autenticitatea și creativitatea' : 'Can limit authenticity and creativity',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul spune: „...ceea ce le limitează originalitatea și creativitatea.”',
            en: 'Correct. The text states: “…which limits their originality and creativity.”'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Îi determină să devină lideri' : 'Encourages them to become leaders',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Dorința de conformare nu stimulează leadershipul, ci adaptarea la normele grupului.',
            en: 'Incorrect. The desire to conform doesn’t encourage leadership but adaptation to group norms.'
          }
        }
      ]
    },
    {
      id: 4,
      text: language === 'ro' ? 'Ce este efectul de turmă în contextul adolescenței?' : 'What is the herd mentality in the context of adolescence?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Alegerea de a urma un lider pozitiv' : 'Choosing to follow a positive leader',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este vorba despre lideri, ci despre presiunea inconștientă de a imita grupul.',
            en: 'Incorrect. It’s not about leaders but the unconscious pressure to imitate the group.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Un mecanism prin care adolescenții se protejează' : 'A mechanism by which teenagers protect themselves',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Efectul de turmă poate duce la comportamente riscante, nu la protecție.',
            en: 'Incorrect. Herd mentality can lead to risky behaviors, not protection.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Tendința de a copia comportamentele grupului' : 'The tendency to copy group behaviors',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul oferă exemple clare de alegeri riscante făcute din dorința de apartenență.',
            en: 'Correct. The text provides clear examples of risky choices made due to the desire to belong.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'O formă de sprijin emoțional reciproc' : 'A form of mutual emotional support',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Efectul de turmă nu este prezentat ca sprijin, ci ca o presiune negativă sau potențial dăunătoare.',
            en: 'Incorrect. Herd mentality isn’t presented as support but as a negative or potentially harmful pressure.'
          }
        }
      ]
    },
    {
      id: 5,
      text: language === 'ro' ? 'Ce concluzie transmite autorul despre competiția în adolescență?' : 'What conclusion does the author convey about competition in adolescence?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Este esențială pentru succesul în viață' : 'It is essential for success in life',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul avertizează asupra efectelor negative ale competiției, nu o laudă.',
            en: 'Incorrect. The text warns about the negative effects of competition, not praises it.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Ajută la dezvoltarea unei identități clare' : 'Helps develop a clear identity',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Din contră, competiția și comparația pot afecta formarea identității.',
            en: 'Incorrect. On the contrary, competition and comparison can hinder identity formation.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Poate afecta negativ dezvoltarea emoțională' : 'Can negatively affect emotional development',
          isCorrect: true,
          feedback: {
            ro: 'Corect. „...competiția și presiunea de a se compara în adolescență pot afecta grav dezvoltarea emoțională...”',
            en: 'Correct. “…competition and the pressure to compare in adolescence can severely affect emotional development…”'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Nu are efecte semnificative dacă e moderată' : 'Has no significant effects if moderated',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu discută despre moderație, ci despre impactul negativ general al competiției.',
            en: 'Incorrect. The text doesn’t discuss moderation but the overall negative impact of competition.'
          }
        }
      ]
    }
  ];

  const handleAnswerPress = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.card}>
          <Text style={{marginBottom:0}}></Text>
          <Text style={styles.title}>
            {language === 'ro' ? `Întrebare ${question.id}` : `Question ${question.id}`}
          </Text>
          <Text style={styles.subtitle}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.button,
                  answers[question.id]?.id === option.id && styles.selectedButton,
                  submitted && option.isCorrect && styles.correct,
                  submitted && answers[question.id]?.id === option.id && !option.isCorrect && styles.incorrect
                ]}
                onPress={() => handleAnswerPress(question.id, option)}
                disabled={submitted}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.id]?.id === option.id && styles.selectedButtonText
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {submitted && (
            <Text style={styles.description}>
              {answers[question.id]?.feedback[language]}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!allQuestionsAnswered || submitted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!allQuestionsAnswered || submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Trimite' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, !submitted && styles.disabledButton]}
          onPress={handleReset}
          disabled={!submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Resetează' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginBottom:25}}></Text>
    </ScrollView>
  );
};

const Quiz3Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: language === 'ro' ? 'Ce efect au imaginile idealizate promovate pe rețelele sociale asupra adolescenților?' : 'What effect do idealized images promoted on social media have on teenagers?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Îi învață să-și organizeze mai bine timpul' : 'Teaches them to better organize their time',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este menționat ca efect al social media.',
            en: 'Incorrect. This is not mentioned as an effect of social media.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Le oferă o imagine echilibrată a realității' : 'Provides a balanced view of reality',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul spune că aceste imagini sunt departe de realitate.',
            en: 'Incorrect. The text states that these images are far from reality.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Creează presiune de conformare la standarde nerealiste' : 'Creates pressure to conform to unrealistic standards',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul menționează direct că această presiune vine din idealizarea excesivă.',
            en: 'Correct. The text directly mentions that this pressure comes from excessive idealization.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Îi motivează să urmeze cariere de succes' : 'Motivates them to pursue successful careers',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Cariera nu este menționată ca temă în acest context.',
            en: 'Incorrect. Careers are not mentioned as a theme in this context.'
          }
        }
      ]
    },
    {
      id: 2,
      text: language === 'ro' ? 'Ce înseamnă „F.O.M.O.” în contextul adolescenților?' : 'What does “F.O.M.O.” mean in the context of teenagers?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Dorința de a fi mereu pe primul loc' : 'The desire to always be in first place',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. F.O.M.O. este despre frica de a rata experiențe, nu competiție.',
            en: 'Incorrect. F.O.M.O. is about the fear of missing out on experiences, not competition.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Teama de a pierde oportunități sau evenimente importante' : 'The fear of missing out on opportunities or important events',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul definește clar F.O.M.O. ca această teamă.',
            en: 'Correct. The text clearly defines F.O.M.O. as this fear.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Nevoia constantă de validare online' : 'The constant need for online validation',
          isCorrect: false,
          feedback: {
            ro: 'Parțial adevărat, dar nu e definiția F.O.M.O.',
            en: 'Partially true, but it’s not the definition of F.O.M.O.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Frustrarea legată de rețelele sociale' : 'Frustration related to social media',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este termenul corect pentru această stare.',
            en: 'Incorrect. This is not the correct term for this state.'
          }
        }
      ]
    },
    {
      id: 3,
      text: language === 'ro' ? 'Ce poate declanșa comparația constantă cu „viața perfectă” din online?' : 'What can constant comparison with the “perfect life” online trigger?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Dorința de a studia în străinătate' : 'The desire to study abroad',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este menționat în text.',
            en: 'Incorrect. This is not mentioned in the text.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Lipsa de satisfacție față de propria viață' : 'Dissatisfaction with one’s own life',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul afirmă că adolescenții devin nemulțumiți de viața reală.',
            en: 'Correct. The text states that teenagers become dissatisfied with their real lives.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Curiozitate față de alte culturi' : 'Curiosity about other cultures',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este subliniat ca efect.',
            en: 'Incorrect. This is not highlighted as an effect.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Motivație pentru dezvoltare personală' : 'Motivation for personal development',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul accentuează mai degrabă efecte negative.',
            en: 'Incorrect. The text emphasizes negative effects instead.'
          }
        }
      ]
    },
    {
      id: 4,
      text: language === 'ro' ? 'De ce sunt periculoase conceptele precum „YOLO” pentru adolescenți?' : 'Why are concepts like “YOLO” dangerous for teenagers?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Îi fac mai conștienți de propria mortalitate' : 'They make them more aware of their own mortality',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu vorbește despre conștientizarea morții.',
            en: 'Incorrect. The text does not discuss awareness of mortality.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Pot duce la comportamente impulsive și riscante' : 'They can lead to impulsive and risky behaviors',
          isCorrect: true,
          feedback: {
            ro: 'Corect. YOLO și FOMO sunt asociate cu decizii impulsive în text.',
            en: 'Correct. YOLO and FOMO are associated with impulsive decisions in the text.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Îi determină să se izoleze social' : 'They cause them to socially isolate',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Dimpotrivă, îi împing spre interacțiune, dar uneori nesănătoasă.',
            en: 'Incorrect. On the contrary, they push them toward interaction, sometimes unhealthy.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Favorizează dependența de jocuri video' : 'They promote video game addiction',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul nu tratează acest subiect.',
            en: 'Incorrect. The text does not address this topic.'
          }
        }
      ]
    },
    {
      id: 5,
      text: language === 'ro' ? 'Cum este diferită imaginea adolescentului din media față de realitatea din România?' : 'How is the media’s image of a teenager different from the reality in Romania?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Adolescentul din media este mai interesat de educație' : 'The media’s teenager is more interested in education',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu se menționează aspectul educațional.',
            en: 'Incorrect. The educational aspect is not mentioned.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Imaginea media reflectă exact viața din România' : 'The media image exactly reflects life in Romania',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul spune că imaginea nu reflectă realitatea locală.',
            en: 'Incorrect. The text states that the image does not reflect local reality.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Adolescentul idealizat are acces la tehnologie și oportunități nelimitate' : 'The idealized teenager has access to unlimited technology and opportunities',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Paragraful final menționează acest contrast clar.',
            en: 'Correct. The final paragraph clearly mentions this contrast.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Adolescenții români nu sunt influențați de mass-media' : 'Romanian teenagers are not influenced by the media',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Dimpotrivă, textul sugerează exact opusul.',
            en: 'Incorrect. On the contrary, the text suggests the opposite.'
          }
        }
      ]
    }
  ];

  const handleAnswerPress = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.card}>
          <Text style={{marginBottom:0}}></Text>
          <Text style={styles.title}>
            {language === 'ro' ? `Întrebare ${question.id}` : `Question ${question.id}`}
          </Text>
          <Text style={styles.subtitle}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.button,
                  answers[question.id]?.id === option.id && styles.selectedButton,
                  submitted && option.isCorrect && styles.correct,
                  submitted && answers[question.id]?.id === option.id && !option.isCorrect && styles.incorrect
                ]}
                onPress={() => handleAnswerPress(question.id, option)}
                disabled={submitted}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.id]?.id === option.id && styles.selectedButtonText
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {submitted && (
            <Text style={styles.description}>
              {answers[question.id]?.feedback[language]}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!allQuestionsAnswered || submitted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!allQuestionsAnswered || submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Trimite' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, !submitted && styles.disabledButton]}
          onPress={handleReset}
          disabled={!submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Resetează' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginBottom:25}}></Text>
    </ScrollView>
  );
};

const Quiz4Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: language === 'ro' ? 'Ce rol joacă rețelele sociale în percepția adolescentelor despre propriul corp?' : 'What role do social media play in teenage girls’ perception of their bodies?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Le oferă sfaturi medicale validate despre nutriție' : 'They provide validated medical advice about nutrition',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul menționează că multe informații sunt promovate de influenceri, nu specialiști.',
            en: 'Incorrect. The text mentions that much information is promoted by influencers, not specialists.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Promovează diversitatea corporală și acceptarea de sine' : 'They promote body diversity and self-acceptance',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Dimpotrivă, promovează corpuri idealizate și editate.',
            en: 'Incorrect. On the contrary, they promote idealized and edited bodies.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Creează presiune de a se conforma unor standarde nerealiste' : 'They create pressure to conform to unrealistic standards',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul afirmă clar că rețelele sociale promovează standarde greu de atins.',
            en: 'Correct. The text clearly states that social media promote hard-to-achieve standards.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Nu au un impact semnificativ asupra adolescentelor' : 'They have no significant impact on teenage girls',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Impactul este puternic, influențând stima de sine și comportamentul alimentar.',
            en: 'Incorrect. The impact is strong, influencing self-esteem and eating behaviors.'
          }
        }
      ]
    },
    {
      id: 2,
      text: language === 'ro' ? 'Ce poate duce la o stimă de sine scăzută în rândul adolescentelor, conform textului?' : 'What can lead to low self-esteem among teenage girls, according to the text?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Lipsa de interes pentru sport' : 'Lack of interest in sports',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Sportul nu este menționat ca factor determinant al stimei de sine.',
            en: 'Incorrect. Sports are not mentioned as a determining factor of self-esteem.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Comparația constantă cu imaginile din social media' : 'Constant comparison with social media images',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul accentuează efectul comparației cu idealuri nerealiste.',
            en: 'Correct. The text emphasizes the effect of comparison with unrealistic ideals.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Nevoia de a învăța mai bine la școală' : 'The need to perform better at school',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Subiectul textului nu este legat de performanță academică.',
            en: 'Incorrect. The text’s subject is not related to academic performance.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Timpul petrecut cu familia' : 'Time spent with family',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este prezentat ca problemă în text.',
            en: 'Incorrect. It is not presented as a problem in the text.'
          }
        }
      ]
    },
    {
      id: 3,
      text: language === 'ro' ? 'Ce consecințe au dietele drastice asupra sănătății adolescentelor?' : 'What are the consequences of extreme diets on teenage girls’ health?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Asigură rapid rezultate durabile' : 'They ensure quick, lasting results',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul spune clar că nu garantează rezultate pe termen lung.',
            en: 'Incorrect. The text clearly states that they do not guarantee long-term results.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Pot cauza oboseală, deficiențe nutriționale și probleme de concentrare' : 'They can cause fatigue, nutritional deficiencies, and concentration problems',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Aceste efecte sunt descrise în detaliu în al treilea paragraf.',
            en: 'Correct. These effects are described in detail in the third paragraph.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Îmbunătățesc performanța la școală' : 'They improve school performance',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Dimpotrivă, lipsa nutrienților afectează concentrarea.',
            en: 'Incorrect. On the contrary, nutrient deficiencies affect concentration.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Sunt recomandate de specialiști în sănătate' : 'They are recommended by health specialists',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Multe provin de pe internet, nu din surse avizate.',
            en: 'Incorrect. Many come from the internet, not from credible sources.'
          }
        }
      ]
    },
    {
      id: 4,
      text: language === 'ro' ? 'Ce se poate întâmpla când alimentația devine o sursă de vinovăție constantă?' : 'What can happen when food becomes a constant source of guilt?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Adolescentele mănâncă mai echilibrat' : 'Teenage girls eat more balanced diets',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul sugerează opusul — relația cu mâncarea devine negativă.',
            en: 'Incorrect. The text suggests the opposite — the relationship with food becomes negative.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Apar sentimente de frustrare și comportamente autodistructive' : 'Feelings of frustration and self-destructive behaviors emerge',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul vorbește despre anxietate, depresie, izolare socială.',
            en: 'Correct. The text discusses anxiety, depression, and social isolation.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Adolescentele încep să studieze nutriția' : 'Teenage girls start studying nutrition',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu se menționează interesul pentru educație nutrițională.',
            en: 'Incorrect. Interest in nutritional education is not mentioned.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Se simt motivate să adopte stiluri de viață sănătoase' : 'They feel motivated to adopt healthy lifestyles',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu este despre motivație pozitivă, ci despre presiune și obsesie.',
            en: 'Incorrect. It’s not about positive motivation but about pressure and obsession.'
          }
        }
      ]
    },
    {
      id: 5,
      text: language === 'ro' ? 'De ce este important ca părinții și profesorii să intervină în fața culturii dietetice?' : 'Why is it important for parents and teachers to intervene in the face of diet culture?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Pentru a încuraja adolescenții să își reducă porțiile' : 'To encourage teenagers to reduce their portions',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Aceasta este o atitudine care poate agrava problema.',
            en: 'Incorrect. This attitude can worsen the problem.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Pentru a promova un corp ideal în rândul tinerilor' : 'To promote an ideal body among young people',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul critică idealizarea corpului.',
            en: 'Incorrect. The text criticizes body idealization.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Pentru a preveni tulburările alimentare și a sprijini sănătatea emoțională' : 'To prevent eating disorders and support emotional health',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Intervenția timpurie este esențială pentru prevenirea efectelor grave.',
            en: 'Correct. Early intervention is essential to prevent severe effects.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Pentru a le interzice adolescenților accesul la social media' : 'To ban teenagers from accessing social media',
          isCorrect: false,
          feedback: {
            ro: 'Parțial greșit. Nu se sugerează interzicerea, ci educarea și sprijinul.',
            en: 'Partially incorrect. Banning is not suggested; education and support are.'
          }
        }
      ]
    }
  ];

  const handleAnswerPress = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.card}>
          <Text style={{marginBottom:0}}></Text>
          <Text style={styles.title}>
            {language === 'ro' ? `Întrebare ${question.id}` : `Question ${question.id}`}
          </Text>
          <Text style={styles.subtitle}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.button,
                  answers[question.id]?.id === option.id && styles.selectedButton,
                  submitted && option.isCorrect && styles.correct,
                  submitted && answers[question.id]?.id === option.id && !option.isCorrect && styles.incorrect
                ]}
                onPress={() => handleAnswerPress(question.id, option)}
                disabled={submitted}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.id]?.id === option.id && styles.selectedButtonText
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {submitted && (
            <Text style={styles.description}>
              {answers[question.id]?.feedback[language]}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!allQuestionsAnswered || submitted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!allQuestionsAnswered || submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Trimite' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, !submitted && styles.disabledButton]}
          onPress={handleReset}
          disabled={!submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Resetează' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginBottom:25}}></Text>
    </ScrollView>
  );
};

const Quiz5Screen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: language === 'ro' ? 'Ce influențează negativ încrederea în sine a adolescenților, potrivit textului?' : 'What negatively affects teenagers’ self-confidence, according to the text?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Munca în echipă și sportul' : 'Teamwork and sports',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Acestea sunt prezentate ca activități benefice în text.',
            en: 'Incorrect. These are presented as beneficial activities in the text.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Rețelele sociale, comentariile negative și standardele sociale' : 'Social media, negative comments, and social standards',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Textul menționează direct aceste trei elemente ca fiind factori negativi.',
            en: 'Correct. The text directly mentions these three elements as negative factors.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Timpul petrecut cu familia' : 'Time spent with family',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Familia este sugerată ca sursă de sprijin, nu de presiune.',
            en: 'Incorrect. Family is suggested as a source of support, not pressure.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Alimentația sănătoasă' : 'Healthy eating',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Alimentația sănătoasă este un factor pozitiv pentru bunăstare.',
            en: 'Incorrect. Healthy eating is a positive factor for well-being.'
          }
        }
      ]
    },
    {
      id: 2,
      text: language === 'ro' ? 'Ce recomandă textul pentru formarea unei imagini de sine sănătoase?' : 'What does the text recommend for building a healthy self-image?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Evitarea completă a social media' : 'Completely avoiding social media',
          isCorrect: false,
          feedback: {
            ro: 'Parțial greșit. Textul nu propune evitarea completă, ci folosirea critică a social media.',
            en: 'Partially incorrect. The text does not propose complete avoidance but critical use of social media.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Compararea cu persoane de succes din online' : 'Comparing oneself to successful online figures',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Se recomandă evitarea comparațiilor toxice.',
            en: 'Incorrect. Avoiding toxic comparisons is recommended.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Conștientizarea unicității corpului și discuții cu persoane de încredere' : 'Awareness of the body’s uniqueness and discussions with trusted people',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Este menționat clar în paragraful 2 ca un prim pas esențial.',
            en: 'Correct. It is clearly mentioned in paragraph 2 as an essential first step.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Adoptarea unei diete stricte pentru a arăta mai bine' : 'Adopting a strict diet to look better',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul promovează echilibrul, nu obsesia legată de aspect.',
            en: 'Incorrect. The text promotes balance, not obsession with appearance.'
          }
        }
      ]
    },
    {
      id: 3,
      text: language === 'ro' ? 'Ce atitudine ar trebui să aibă adolescenții față de conținutul online?' : 'What attitude should teenagers have toward online content?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Să accepte tot ce văd ca fiind real' : 'To accept everything they see as real',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul recomandă o atitudine critică față de conținutul online.',
            en: 'Incorrect. The text recommends a critical attitude toward online content.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Să urmărească doar vedete și influenceri faimoși' : 'To follow only famous celebrities and influencers',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Este sugerat să urmărească creatori care promovează diversitatea.',
            en: 'Incorrect. It is suggested to follow creators who promote diversity.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Să privească critic și să evite comparațiile toxice' : 'To view critically and avoid toxic comparisons',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Aceasta este recomandarea explicită din text.',
            en: 'Correct. This is the explicit recommendation from the text.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Să posteze imagini editate pentru a fi apreciați' : 'To post edited images to gain approval',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul încurajează autenticitatea, nu conformarea la presiuni.',
            en: 'Incorrect. The text encourages authenticity, not conforming to pressures.'
          }
        }
      ]
    },
    {
      id: 4,
      text: language === 'ro' ? 'De ce este importantă mișcarea fizică în adolescență, conform textului?' : 'Why is physical activity important in adolescence, according to the text?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Pentru a obține corpul ideal promovat în media' : 'To achieve the ideal body promoted in the media',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul subliniază că mișcarea trebuie făcută din plăcere, nu din obligație.',
            en: 'Incorrect. The text emphasizes that physical activity should be done for enjoyment, not obligation.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Pentru a arde caloriile cât mai rapid' : 'To burn calories as quickly as possible',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Accentul este pe sănătate și echilibru emoțional, nu pe controlul greutății.',
            en: 'Incorrect. The focus is on health and emotional balance, not weight control.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Pentru sănătatea fizică și bunăstarea emoțională' : 'For physical health and emotional well-being',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Este clar menționat în ultimul paragraf.',
            en: 'Correct. It is clearly mentioned in the final paragraph.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Pentru a concura cu alți adolescenți' : 'To compete with other teenagers',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Competiția nu este un aspect recomandat în contextul acceptării corporale.',
            en: 'Incorrect. Competition is not a recommended aspect in the context of body acceptance.'
          }
        }
      ]
    },
    {
      id: 5,
      text: language === 'ro' ? 'Ce înseamnă acceptarea corpului, potrivit textului?' : 'What does body acceptance mean, according to the text?',
      options: [
        {
          id: 1,
          text: language === 'ro' ? 'Renunțarea la orice efort de îmbunătățire' : 'Giving up any effort to improve',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Nu se promovează delăsarea, ci echilibrul și respectul față de sine.',
            en: 'Incorrect. Neglect is not promoted, but rather balance and self-respect.'
          }
        },
        {
          id: 2,
          text: language === 'ro' ? 'Respect și apreciere pentru propriul sine' : 'Respect and appreciation for oneself',
          isCorrect: true,
          feedback: {
            ro: 'Corect. Aceasta este concluzia finală a textului.',
            en: 'Correct. This is the final conclusion of the text.'
          }
        },
        {
          id: 3,
          text: language === 'ro' ? 'Adoptarea standardelor sociale actuale' : 'Adopting current social standards',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Textul critică tocmai aceste standarde.',
            en: 'Incorrect. The text criticizes these very standards.'
          }
        },
        {
          id: 4,
          text: language === 'ro' ? 'Compararea constantă cu prietenii' : 'Constant comparison with friends',
          isCorrect: false,
          feedback: {
            ro: 'Greșit. Este una dintre problemele semnalate, nu o soluție.',
            en: 'Incorrect. It is one of the problems highlighted, not a solution.'
          }
        }
      ]
    }
  ];

  const handleAnswerPress = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.card}>
          <Text style={{marginBottom:0}}></Text>
          <Text style={styles.title}>
            {language === 'ro' ? `Întrebare ${question.id}` : `Question ${question.id}`}
          </Text>
          <Text style={styles.subtitle}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.button,
                  answers[question.id]?.id === option.id && styles.selectedButton,
                  submitted && option.isCorrect && styles.correct,
                  submitted && answers[question.id]?.id === option.id && !option.isCorrect && styles.incorrect
                ]}
                onPress={() => handleAnswerPress(question.id, option)}
                disabled={submitted}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.id]?.id === option.id && styles.selectedButtonText
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {submitted && (
            <Text style={styles.description}>
              {answers[question.id]?.feedback[language]}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!allQuestionsAnswered || submitted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!allQuestionsAnswered || submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Trimite' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, !submitted && styles.disabledButton]}
          onPress={handleReset}
          disabled={!submitted}
        >
          <Text style={styles.buttonText}>
            {language === 'ro' ? 'Resetează' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginBottom:25}}></Text>
    </ScrollView>
  );
};

const Gallery1 = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
  { id: '1', uri: require('../assets/images/sanatate_pg2.jpg'), title: { ro: 'Sănătatea mintală în adolescența', en: 'Mental Health in Adolescence' } },
  { id: '2', uri: require('../assets/images/chestionar1.jpg'), title: { ro: 'Chestionar sănătatea mintală în adolescență', en: 'Quiz Mental Health in Adolescence' } },
  { id: '3', uri: require('../assets/images/sanatate_pg3.jpg'), title: { ro: 'Competiția și complexitatea comparării', en: 'Competition and the Complexity of Comparison' } },
  { id: '4', uri: require('../assets/images/chestionar2.jpg'), title: { ro: 'Chestionar competiția și complexitatea comparării', en: 'Quiz Competition and the Complexity of Comparison' } },
  { id: '5', uri: require('../assets/images/sanatate_pg4.jpg'), title: { ro: 'Perfecțiunea virtuală', en: 'Virtual Perfection' } },
  { id: '6', uri: require('../assets/images/chestionar3.jpg'), title: { ro: 'Chestionar perfecțiunea virtuală', en: 'Quiz Virtual Perfection' } },
  { id: '4', uri: require('../assets/images/sanatate_pg5.jpg'), title: { ro: 'Mâncatul sau controlul?', en: 'Eating or control' } },
  { id: '8', uri: require('../assets/images/chestionar4.jpg'), title: { ro: 'Chestionar mâncatul sau controlul?', en: 'Quiz Eating or control' } },
  { id: '9', uri: require('../assets/images/sanatate_pg6.jpg'), title: { ro: 'Reconstruirea imaginii de sine', en: 'Rebuilding the Self-Image' } },
  { id: '8', uri: require('../assets/images/chestionar5.jpg'), title: { ro: 'Chestionar reconstruirea imaginii de sine', en: 'Quiz Rebuilding the Self-Image' } },
];

  const styles = getGalleryStyles(theme);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedImage(item.uri)}
      accessibilityLabel={item.title[language]}
      accessibilityRole="imagebutton"
    >
      <View style={styles.card}>
        <Image
          source={item.uri}
          style={styles.thumbnail}
          resizeMode="cover"
          defaultSource={require('../assets/images/sanatate_pg2.jpg')}
        />
        <Text style={styles.description}>{item.title[language]}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        initialNumToRender={9}
        maxToRenderPerBatch={12}
        windowSize={5}
      />
      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
        animationType="fade"
        accessibilityViewIsModal={true}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setSelectedImage(null)}
          accessibilityLabel={language === 'ro' ? 'Închide imaginea' : 'Close image'}
          accessibilityRole="button"
        >
          <Image
            source={selectedImage}
            style={styles.fullImage}
            resizeMode="contain"
            defaultSource={require('../assets/images/sanatate_pg2.jpg')}
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={() => navigation.navigate('Tabs')}>
      <AntDesign
        name="arrowleft"
        size={36}
        color={theme === 'dark' ? '#AAB7B8' : '#333333'}
        style={{ marginLeft: 15, marginTop: 0 }}
      />
    </Pressable>
  );
};

const BackButtonStack = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={() => navigation.navigate('index')}>
      <AntDesign
        name="arrowleft"
        size={36}
        color={theme === 'dark' ? '#AAB7B8' : '#333333'}
        style={{ marginLeft: 15, marginTop: 0 }}
      />
    </Pressable>
  );
};

const Settings = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={{marginBottom:0}}></Text>
      <View style={styles.containerTitle}>
        <BackButton />
        <View style={{ flex: 0.3 }} />
        <HeaderLogo />
      </View>
      <Text style={styles.space}></Text>
      <Text style={styles.settingText}>
        {language === 'ro' ? 'Limbă:' : 'Language:'}
      </Text>
      <TouchableOpacity
        style={[styles.button, language === 'ro' && styles.selectedButton]}
        onPress={() => setLanguage('ro')}
      >
        <Text
          style={[
            styles.buttonText,
            language === 'ro' && styles.selectedButtonText,
          ]}
        >
          {language === 'ro' ? 'Română' : 'Romanian'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === 'en' && styles.selectedButton]}
        onPress={() => setLanguage('en')}
      >
        <Text
          style={[
            styles.buttonText,
            language === 'en' && styles.selectedButtonText,
          ]}
        >
          {language === 'ro' ? 'Engleză' : 'English'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.space}></Text>
      <Text style={styles.settingText}>
        {language === 'ro' ? 'Tematică:' : 'Theme:'}
      </Text>
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.selectedButton]}
        onPress={() => setTheme('dark')}
      >
        <Text
          style={[styles.buttonText, theme === 'dark' && styles.selectedButtonText]}
        >
          {language === 'ro' ? 'Întunecată' : 'Dark'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, theme === 'light' && styles.selectedButton]}
        onPress={() => setTheme('light')}
      >
        <Text
          style={[styles.buttonText, theme === 'light' && styles.selectedButtonText]}
        >
          {language === 'ro' ? 'Deschisă' : 'Light'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:0}}></Text>
      <View style={styles.containerTitle}>
        <BackButton />
        <View style={{ flex: 0.3 }} />
        <HeaderLogo />
      </View>
      <Text style={{marginBottom:15}}></Text>
      <Text style={styles.title}>{language==='ro' ? "Elevii:" : "Students:"}</Text>
      <Text style={styles.subtitle}>Miel Tania Monica</Text>
      <Text style={styles.subtitle}>Buște Alin Rafael</Text>
      <Text style={styles.title}>{language==='ro' ? "Prof. Coordonator:" : "Coordinating teacher"}</Text>
      <Text style={styles.subtitle}>Voronianu Sanda Florina</Text>
    </View>
  );
};

const HeaderRightButton = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <AntDesign
        size={36}
        name="bars"
        color={theme === 'dark' ? '#AAB7B8' : '#333333'}
        style={{ marginRight: 15, marginTop: 0 }}
      />
    </Pressable>
  );
};

const HeaderLogo = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <View style={styles.containerTitle}>
    <Image
          source={require('../assets/images/brain-logo.jpg')}
          style={styles.imageTitle}
    />
    <Text style={styles.textTitle}>Psychopedia</Text>
    </View>
  );
};

const TabNavigator = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
          elevation: 0,
          borderBottomWidth: 0,
          paddingTop: 10,
        },
        headerTintColor: theme === 'dark' ? '#121212' : '#FFFFFF',
      }}
    >
      <Stack.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: language === 'ro' ? 'Acasa' : 'Home',
          headerRight: () => <HeaderRightButton />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'left',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="page2"
        component={Page2Screen}
        options={{
          title: language === 'ro' ? 'Sanatate' : 'Health',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="page3"
        component={Page3Screen}
        options={{
          title: language === 'ro' ? 'Competitie' : 'Competition',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="page4"
        component={Page4Screen}
        options={{
          title: language === 'ro' ? 'Perfectiune' : 'Perfection',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="page5"
        component={Page5Screen}
        options={{
          title: language === 'ro' ? 'Mancarea' : 'Food',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="page6"
        component={Page6Screen}
        options={{
          title: language === 'ro' ? 'Imaginea' : 'Image',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="quiz1"
        component={Quiz1Screen}
        options={{
          title: language === 'ro' ? 'Chestionar' : 'Quiz',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="quiz2"
        component={Quiz2Screen}
        options={{
          title: language === 'ro' ? 'Chestionar' : 'Quiz',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="quiz3"
        component={Quiz3Screen}
        options={{
          title: language === 'ro' ? 'Chestionar' : 'Quiz',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="quiz4"
        component={Quiz4Screen}
        options={{
          title: language === 'ro' ? 'Chestionar' : 'Quiz',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="quiz5"
        component={Quiz5Screen}
        options={{
          title: language === 'ro' ? 'Chestionar' : 'Quiz',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="gallery1"
        component={Gallery1}
        options={{
          title: language === 'ro' ? 'Galerie' : 'Gallery',
          headerRight: () => <HeaderRightButton />,
          headerLeft: () => <BackButtonStack />,
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [language, setLanguage] = useState('ro');
  const [theme, setTheme] = useState('dark');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
              width: 250,
            },
            drawerActiveTintColor: theme === 'dark' ? '#FFF' : '#000000',
            drawerInactiveTintColor: theme === 'dark' ? '#AAB7B8' : '#555555',
            headerShown: false,
          }}
        >
          <Drawer.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="Settings"
            component={Settings}
            options={{
              drawerLabel: language === 'ro' ? 'Setări' : 'Settings',
              drawerIcon: ({ color }) => (
                <AntDesign name="setting" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerLabel: language === 'ro' ? 'Credite' : 'Credits',
              drawerIcon: ({ color }) => (
                <AntDesign name="user" size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;