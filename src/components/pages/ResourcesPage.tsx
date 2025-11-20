import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, BookOpen, Users, GraduationCap, Calendar as CalendarIcon, UtensilsCrossed, MapPin, DollarSign, Tag, Ticket, CreditCard, Video, Music, PenTool, GraduationCap as GraduationCapIcon, Brain, Languages, Shield, Laptop, Library, Building2, Users as UsersIcon, DoorOpen, CheckCircle2, AlertCircle, Clock, X } from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';
import React, { useState } from 'react';

interface ResourcesPageProps {
  language: Language;
}

interface FoodOption {
  name: string;
  description: string;
  address: string;
  priceRange: string;
  type: 'SSMU' | 'McGill' | 'Independent';
}

interface StudentDiscount {
  name: string;
  description: string;
  resourceType: 'FREE' | 'Paid Promoted Service' | 'Discount';
  note?: string;
}

interface Subscription {
  name: string;
  description: string;
  resourceType: 'Free Subscription from McGill' | 'Free subscription from SSMU' | 'General Canadian Student Discount' | 'McGill Service';
  icon?: React.ReactNode;
}

interface StudySpace {
  name: string;
  description: string;
  address: string;
  capacity?: string;
  proximity?: string;
}

interface Booking {
  id: string;
  room: string;
  building: string;
  date: Date;
  startTime: string;
  endTime: string;
  purpose: string;
}

interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  type: 'study' | 'meeting' | 'event';
}

function RoomBookingInterface({ language }: { language: Language }) {
  const t = translations[language];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');

  const rooms: Room[] = [
    { id: '1', name: 'Study Room 101', building: 'Leacock', capacity: 4, type: 'study' },
    { id: '2', name: 'Study Room 102', building: 'Leacock', capacity: 6, type: 'study' },
    { id: '3', name: 'Study Room 201', building: 'Burnside', capacity: 4, type: 'study' },
    { id: '4', name: 'Meeting Room A', building: 'Leacock', capacity: 8, type: 'meeting' },
    { id: '5', name: 'Meeting Room B', building: 'Burnside', capacity: 10, type: 'meeting' },
    { id: '6', name: 'Arts Lounge', building: 'Leacock', capacity: 45, type: 'event' },
    { id: '7', name: 'Conference Room', building: 'Ferrier', capacity: 20, type: 'event' },
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedRoom || !startTime || !endTime) {
      return;
    }

    const room = rooms.find(r => r.id === selectedRoom);
    if (!room) return;

    const newBooking: Booking = {
      id: Date.now().toString(),
      room: room.name,
      building: room.building,
      date: selectedDate,
      startTime,
      endTime,
      purpose: purpose || 'General use',
    };

    setBookings([...bookings, newBooking]);
    setShowSuccess(true);
    setSelectedRoom('');
    setStartTime('');
    setEndTime('');
    setPurpose('');
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'book' | 'my-bookings')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="book">{t.roomBookingBookRoom}</TabsTrigger>
          <TabsTrigger value="my-bookings">{t.roomBookingMyBookings}</TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.roomBookingBookRoom}</CardTitle>
              <CardDescription>{t.roomBookingSubtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <div className="space-y-2">
                  <Label htmlFor="room">{t.roomBookingSelectRoom}</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger id="room">
                      <SelectValue placeholder={t.roomBookingSelectRoom} />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - {room.building} ({t.roomBookingCapacity}: {room.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>{t.roomBookingSelectDate}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? formatDate(selectedDate) : t.roomBookingSelectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">{t.roomBookingStartTime}</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger id="start-time">
                        <SelectValue placeholder={t.roomBookingStartTime} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">{t.roomBookingEndTime}</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger id="end-time">
                        <SelectValue placeholder={t.roomBookingEndTime} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="purpose">{t.roomBookingPurpose}</Label>
                  <Textarea
                    id="purpose"
                    placeholder={t.roomBookingPurposePlaceholder}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-800">{t.roomBookingSuccess}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  {t.roomBookingSubmit}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Available Rooms List */}
      <Card>
        <CardHeader>
              <CardTitle>{t.roomBookingAvailableSpaces}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <Card key={room.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{room.name}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{room.building} {t.roomBookingBuilding}</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {room.capacity} {t.roomBookingCapacity}
                        </Badge>
                      </div>
              </CardHeader>
              <CardContent>
                      <Badge className={
                        room.type === 'study' ? 'bg-blue-100 text-blue-800' :
                        room.type === 'meeting' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }>
                        {room.type === 'study' ? t.roomBookingStudyRooms :
                         room.type === 'meeting' ? t.roomBookingMeetingRooms :
                         t.roomBookingEventSpaces}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="my-bookings" className="space-y-4">
          <Card>
              <CardHeader>
              <CardTitle>{t.roomBookingMyBookings}</CardTitle>
              </CardHeader>
              <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>{t.roomBookingNoBookings}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-red-600" />
                              <span className="font-semibold">{booking.room}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.building} {t.roomBookingBuilding}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                            {booking.purpose && (
                              <p className="text-sm text-gray-600 mt-2">{booking.purpose}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function ResourcesPage({ language }: ResourcesPageProps) {
  const t = translations[language];

  const onCampusFoodOptions: FoodOption[] = [
    {
      name: "SNAX Café",
      description: "Café run by your very own undergraduate society offering quick coffees and bagels before and between classes.",
      address: "855 Sherbrooke Street West, Leacock Building - First floor behind the main elevators.",
      priceRange: "$1.50-5 (One Dollar Drip Coffee Available)",
      type: "SSMU"
    },
    {
      name: "EUS General Store \"G-Store\"",
      description: "Known for their $1 coffee (or just $0.75 if you bring your own cup), G-Store is your one-stop shop for affordable snacks, drinks, and school supplies. Pretty much everything you could ever need as a McGill Engineering student! G-Store is a student favorite and was proudly named EUS Service of the Year in both 2023 and 2025.",
      address: "McConnell Engineering Building, Ground Floor. Found within the EUS Mall in between Frostbite and CopiEUS.",
      priceRange: "$1-8 (Ninety-Nine Cent Drip Coffee Available)",
      type: "SSMU"
    },
    {
      name: "Dave's Store",
      description: "Suprette / Quick Snack Shop run by the MUS (Management Undergraduate Society)! Offering some of the cheapest prices for energy drinks and coffee on campus.",
      address: "1001 Rue Sherbrooke O, Bronfman Building Basement (Where 4à7 takes place every Thursday)",
      priceRange: "$1-7 (One Dollar Drip Coffee Available)",
      type: "SSMU"
    },
    {
      name: "Soupe (Burnside) Café",
      description: "Quick and centrally located cafe serving bagels, soups, grilled cheese, muffins, sandwiches, etc. in the basement of Burnside.",
      address: "Burnside Hall, Basement (Accessible via the main building or stairs outside of Schulich Library)",
      priceRange: "",
      type: "McGill"
    },
    {
      name: "Frostbite",
      description: "A beloved, student-run ice cream shop offering affordable sweet treats run by the EUS (Engineering Undergraduate Society)! Host weekly \"Toonie Tuesdays\" where two scoops of Ice Cream is only $2. Got less than 30% on an assessment worth 15% or more of your final grade? Stop by for a free ice cream!",
      address: "McConnell Engineering Building, Ground Floor. Found within the EUS Mall accessible by making a left immediately after entering McConnell from the Milton Gates Entrance",
      priceRange: "",
      type: "SSMU"
    },
    {
      name: "Vinh's Café / Vinh's Too",
      description: "A top pick for students and faculty seeking quick, reasonably priced Vietnamese fare such as banh mi sandwiches, pho, and steamed buns, all highly praised for freshness and portion size.",
      address: "Genome Building (740 Avenue du Docteur-Penfield), Strathcona Music Building (555 Rue Sherbrooke Ouest)",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Quesada",
      description: "Fast-casual chain specializing in Mexican-inspired fare like burritos, tacos, bowls, and quesadillas (similar to Chipotle/Poulet Rouge). Vegetarian, vegan, and gluten-friendly options available",
      address: "Trottier Basement Floor (Left of the Elevators), Trottier Building",
      priceRange: "$10-14",
      type: "McGill"
    },
    {
      name: "Pan Américan Pizza",
      description: "",
      address: "McCall McBain Arts Building Basement (Where the Subway was previously located)",
      priceRange: "Big Red Special: $8 for Big Red Pizza and Soda, $7-16",
      type: "Independent"
    },
    {
      name: "Toi & Moi (Redpath) Café",
      description: "You can find Toi Moi & Café-branded specialty coffee as part of the broader Redpath Café menu, alongside sandwiches, poke bowls, salads, sushi, and vegan/gluten-free options. This makes it a convenient grab-and-go spot for students looking for quality coffee and quick meals in the heart of McGill. Also offers the Cano service (reusable container service that lets you borrow sturdy, reusable food containers reducing the price of your coffee and with no deposit, aiming to reduce single-use waste on campus)",
      address: "Redpath Basement aka Cybertech, 3459 McTavish Street",
      priceRange: "",
      type: "McGill"
    },
    {
      name: "CoucheTard",
      description: "Partnership between McGill University and Alimentation Couche-Tard, resulting in the Retail Innovation Lab at the Bensadoun School of Retail Management on McGill's downtown campus. This \"live laboratory store\" is one of the first in North America where a university and a major retailer jointly operate a public retail space to test and showcase the future of convenience retail. Functions as a regular modern franchise convenience store.",
      address: "Bronfman Building Lobby, 1001 Sherbrooke Street West",
      priceRange: "$2-6",
      type: "McGill"
    },
    {
      name: "Dispatch Café",
      description: "Offers freshly brewed specialty coffee, hot and cold blended beverages, gourmet coffee products, sandwiches, and assorted pastries, making it a convenient stop for students and staff.",
      address: "McConnell Engineering Building - Ground Floor. Found next to the Car Displays in the Lobby (Milton Gates Entrance Side - Not Roddick Gates!)",
      priceRange: "$3-10",
      type: "Independent"
    },
    {
      name: "Mezzé Café",
      description: "Offers a variety of classic and modern Mediterranean favorites, including shawarma bowls, pitas, falafel, salads, and mezze-style sides. Both vegetarian and Halal options are always available",
      address: "McConnell Engineering Building, Ground Floor. Found behind the McGill Baja and Formula Electric Display - Room 116",
      priceRange: "$6-16",
      type: "McGill"
    },
    {
      name: "McMed Café",
      description: "Serves as a primary food destination for medical, science, and health students, and staff as it is out of the way of central campus however is perfect for back-to-back midday lectures in McMed floor 5. Most items are available buffet-style or as ready-to-go selections.",
      address: "McIntyre Medical Building, Floor 6",
      priceRange: "",
      type: "McGill"
    },
    {
      name: "LSA CoffeeHouse",
      description: "Run by the LSA (Law Student Association)",
      address: "Go to Nahum Gelber Law Library, enter the first door, turn left. It is at the end of the hallway in the Main Atrium",
      priceRange: "$2-5 (One Dollar Drip Coffee Available)",
      type: "SSMU"
    },
    {
      name: "Pytho Café",
      description: "",
      address: "",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Café Notman",
      description: "",
      address: "",
      priceRange: "",
      type: "Independent"
    }
  ];

  const offCampusFoodOptions: FoodOption[] = [
    {
      name: "Lola Rosa Milton",
      description: "A well-known, cozy vegetarian and vegan restaurant on Milton Street",
      address: "545 Rue Milton, Just down the street from the Milton Gates towards Le Plateau",
      priceRange: "$13-30",
      type: "Independent"
    },
    {
      name: "Opiano",
      description: "A casual, student-friendly Korean restaurant located next to the Cartier apartment building, known for its generous portions, quick service, and very reasonable prices.",
      address: "Next to the Cartier apartment building",
      priceRange: "$8-15.50",
      type: "Independent"
    },
    {
      name: "Mintar",
      description: "",
      address: "3418b Av. du Parc",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Tim Horton's",
      description: "A Canadian staple coffeehouse & fast-food restaurant chain known for quick and affordable coffee, bagels and wraps.",
      address: "666 Rue Sherbrooke Ouest, At the other side of the University Street and Sherbrooke Intersection near RVC",
      priceRange: "$5-15",
      type: "Independent"
    },
    {
      name: "Nouilles Zhonghua",
      description: "A casual Chinese noodle restaurant, renowned for its generous portions of authentic hand-pulled noodles made in the front window as you eat. The menu specialties are Lanzhou beef noodle soup, braised beef tendon noodles, and the spicy, vegetarian-friendly oil spill noodles.",
      address: "908 Rue Sherbrooke O, Right across the street from the Roddick Gates",
      priceRange: "$10-18",
      type: "Independent"
    },
    {
      name: "Schwarmania",
      description: "Mediterranean shawarma food spot located right outside the Roddick Gates. It offers quick, tasty, and affordable shawarma options, rice and potatoes, and other sides. Halal & Veg Options available",
      address: "896 Rue Sherbrooke O",
      priceRange: "$7-16 (Offers a 15% Student Discount)",
      type: "Independent"
    },
    {
      name: "Time-Out Market",
      description: "Spans 40,000 square feet and features a mix of 15 of the city's top chefs and best restaurateurs along with 7 bars, cultural spaces for art installations, music, and more.",
      address: "705 Sainte-Catherine Ouest, on the second floor (use escalators)",
      priceRange: "$15-30",
      type: "Independent"
    },
    {
      name: "Japote",
      description: "Serves authentic Japanese lunch boxes at affordable prices. Note: Only open from Monday to Friday, 11:30am to 2:00pm, Closed on weekends.",
      address: "1000 Sherbrooke West, Concourse Level",
      priceRange: "$5-10",
      type: "Independent"
    },
    {
      name: "McGill Pizza",
      description: "A popular Pizza place right next to the Milton Gates, known for its classic diner comfort foods with a touch of Greek influence. It has been a favorite among McGill students, staff, and professors since the 1960s, although it has no formal connection to the university itself. Serves Breakfast & Lunch and features occasional great-value happy hours.",
      address: "625 Rue Milton",
      priceRange: "$5-20",
      type: "Independent"
    },
    {
      name: "A&W",
      description: "Fast-food chain specializing in classic burgers, onion rings, and root beer, known for nostalgic diner-style",
      address: "655 Av. du Président-Kennedy",
      priceRange: "$10-15",
      type: "Independent"
    },
    {
      name: "Pizza Bros",
      description: "Quick-serve pizza featuring build-your-own options, as well as salads and beverages.",
      address: "2075 Blvd Robert-Bourassa Suite 100",
      priceRange: "$10-30",
      type: "Independent"
    },
    {
      name: "HinnawiBros Bagels",
      description: "Regional chain serving housemade bagels, sandwiches, and coffee drinks in a cozy, modern café ambiance. Popular for breakfast or a quick meal with options for dine-in, takeout, and coffee",
      address: "645 Av. du Président-Kennedy",
      priceRange: "$2.50-12",
      type: "Independent"
    },
    {
      name: "Columbus Café",
      description: "",
      address: "2020 Blvd Robert-Bourassa, First Floor",
      priceRange: "$8-20",
      type: "Independent"
    },
    {
      name: "Castel",
      description: "",
      address: "1015 Rue Sherbrooke O",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Café Saint-Barth",
      description: "",
      address: "3498 Av. du Parc (Where Milton B used to be located)",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Solit",
      description: "",
      address: "2030 Rue Mansfield",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Humble Lion",
      description: "This chic independent café offers several coffee drinks, teas, hot chocolates and pastries right next to the Roddick Gates.",
      address: "904 Rue Sherbrooke O",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Leaves House",
      description: "Offers all forms of non-dairy",
      address: "",
      priceRange: "",
      type: "Independent"
    },
    {
      name: "Starbucks",
      description: "A classic, globally recognized coffeehouse serving signature coffees, teas, and light snacks in a modern, casual setting with WiFi and ample power outlets. Popular for both quick meets and solo work sessions, it's frequented by students and professionals alike.",
      address: "Le Cartier, Sherbrooke Street Side, 475 Rue Sherbrooke O, next to Carrefour Sherbrooke (First Year Residence Hall)",
      priceRange: "$5-15",
      type: "Independent"
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'SSMU': return t.foodOptionsTypeSSMU;
      case 'McGill': return t.foodOptionsTypeMcGill;
      case 'Independent': return t.foodOptionsTypeIndependent;
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SSMU': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'McGill': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Independent': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const groupByType = (options: FoodOption[]) => {
    const grouped: { [key: string]: FoodOption[] } = {
      'SSMU': [],
      'McGill': [],
      'Independent': []
    };
    options.forEach(option => {
      if (grouped[option.type]) {
        grouped[option.type].push(option);
      }
    });
    return grouped;
  };

  const studentDiscounts: StudentDiscount[] = [
    {
      name: "SPC Card \"Student Price Card\"",
      description: "A popular discount program in Canada for students aged 14-24, offering savings of 10% to 25% on fashion, food, shoes, travel, and more at over 450 participating retailers and sites nationwide. The card can be obtained as a physical card or a digital membership through the SPC app, with the standard membership price typically around $12 for one year. Students show their card along with a student ID to access these discounts, which also include exclusive offers, contests, and personalized deals. SPC+ can be obtained for free through their partnership with CIBC allowing eligible student and youth clients of CIBC to receive a free upgraded SPC+ digital membership as part of their banking benefits, enhancing savings and rewards while integrating with CIBC's student banking products.",
      resourceType: "Paid Promoted Service"
    },
    {
      name: "Unidays",
      description: "Digital platform offering exclusive student discounts across over 800 brands globally, including fashion, technology, health, and entertainment. Students verify their status through the app and gain access to discounts up to 50%, with offers available both online and in-store, covering popular brands like Apple, Nike, and ASOS. Membership is free and lasts 12 months with annual verification via the Minerva portal.",
      resourceType: "FREE"
    },
    {
      name: "Rakuten",
      description: "A cashback and rewards platform that lets users earn money back when shopping online at partnered retailers. Students can use Rakuten to maximize savings by earning cashback on purchases from a wide range of stores, including fashion, electronics, and more. The platform often combines cashback with exclusive student discounts and promotional deals, making it a valuable tool for budget-conscious shoppers. $40 Cash Bonus with Student Email Signup",
      resourceType: "FREE",
      note: "These two are best used together to find the best cashback between the two"
    },
    {
      name: "Honey",
      description: "A free browser extension and app that automatically finds and applies coupon codes at checkout on many online stores and online grocery ordering platforms. For students, Honey offers an effortless way to save on everyday purchases by ensuring they get the best available discount code. Honey also features a rewards program, where users earn points (\"Honey Gold\") redeemable for gift cards, adding extra value beyond just coupon savings",
      resourceType: "FREE",
      note: "These two are best used together to find the best cashback between the two"
    },
    {
      name: "Amazon Prime Student",
      description: "6 Months of free Amazon Prime then $4.99/month afterwards",
      resourceType: "Discount"
    },
    {
      name: "Accès Montréal Card",
      description: "Provides Montréal residents with discounted access to over 70 cultural, sports, and recreational venues across the city. For arts and culture, cardholders enjoy reduced rates at museums, movie theatres, festivals, theatres, and guided tours, as well as benefits at Espace pour la vie sites like the Biodôme and Botanical Garden. For sports and recreation, the card offers lower fees for indoor and outdoor court rentals, discounts on activities such as zip lines and mini-putt, priority booking privileges, and access to sports-focused day camps.",
      resourceType: "Paid Promoted Service"
    }
  ];

  const getDiscountTypeLabel = (type: string) => {
    switch (type) {
      case 'FREE': return t.studentDiscountTypeFree;
      case 'Paid Promoted Service': return t.studentDiscountTypePaid;
      case 'Discount': return t.studentDiscountTypeDiscount;
      default: return type;
    }
  };

  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case 'FREE': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Paid Promoted Service': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Discount': return 'bg-orange-100 text-orange-800 border border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const subscriptions: Subscription[] = [
    {
      name: "Zoom",
      description: "McGill University provides Zoom accounts to students, faculty, and staff. Access is available through the dedicated portal at mcgill.zoom.us, using your McGill username and password with two-factor authentication for added security. Zoom accounts allow meetings of up to 300 participants and a duration of up to 24 hours",
      resourceType: "Free Subscription from McGill",
      icon: <Video className="w-5 h-5" />
    },
    {
      name: "Spotify",
      description: "Two Months Free of a popular digital streaming service that lets users listen to music, podcasts, and some video content from creators all over the world.",
      resourceType: "General Canadian Student Discount",
      icon: <Music className="w-5 h-5" />
    },
    {
      name: "Youtube Premium",
      description: "All Premium benefits—ad-free viewing, offline downloads, background play, and YouTube Music Premium $7.99/month for students",
      resourceType: "General Canadian Student Discount",
      icon: <Video className="w-5 h-5" />
    },
    {
      name: "Grammarly",
      description: "An AI-powered writing assistant designed to help users communicate more clearly and effectively. It checks grammar, spelling, punctuation, tone, and style in real time, providing suggestions for improvement and even offering generative AI features to rewrite or draft content. FREE through SSMU",
      resourceType: "Free subscription from SSMU",
      icon: <PenTool className="w-5 h-5" />
    },
    {
      name: "Udemy",
      description: "An online learning platform that offers thousands of courses across a wide range of subjects, including business, technology, personal development, creative skills, and more. Courses are taught by industry professionals and experts, featuring video lectures, quizzes, and assignments that users can complete at their own pace. With lifetime access to purchased courses and a flexible, self-directed format, Udemy is a valuable resource for students and professionals looking to deepen knowledge, build new skills, or advance their careers. FREE through SSMU",
      resourceType: "Free subscription from SSMU",
      icon: <GraduationCapIcon className="w-5 h-5" />
    },
    {
      name: "Headspace",
      description: "A science-backed mindfulness and meditation app designed to help users reduce stress, improve focus, and support overall mental wellbeing. It offers guided meditations, breathing exercises, sleep sounds, and specialized programs for stress management, productivity, and healthy living. Users can choose sessions of varying lengths, making it easy to integrate mindfulness into daily routines. Headspace combines simplicity with evidence-based practices, making it a trusted companion for individuals seeking balance, focus, and improved mental health. FREE through SSMU",
      resourceType: "Free subscription from SSMU",
      icon: <Brain className="w-5 h-5" />
    },
    {
      name: "Antidote",
      description: "A comprehensive writing assistance software that helps users improve their English and French writing by offering advanced grammar and spell checking, detailed dictionaries and thesaurus, language and style guides, and stylistic advice. It supports both languages, provides translation aids, and integrates with popular writing platforms as a desktop app, web tool, or mobile app, making it a valuable resource for writers, students, and professionals seeking to produce high-quality, error-free documents. FREE through SSMU",
      resourceType: "Free subscription from SSMU",
      icon: <Languages className="w-5 h-5" />
    },
    {
      name: "Dashlane Password/VPN",
      description: "Password manager, digital wallet and VPN Provider that enables users to securely store, manage, and autofill passwords, payment information, and other sensitive data across all their devices. Its encryption uses AES-256 and a zero-knowledge architecture (super easy to start using and get used to) - 6 Months of Dashlane Premium free for students. This application / browser is highly recommended as it saves you time every single day when logging into your online profiles and keeping you safe online with their VPN all for free for a year.",
      resourceType: "General Canadian Student Discount",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Free Software on McGill Workstations",
      description: "McGill Libraries have various workstations with free downloaded softwares (Listed Below) The link allows you to search the software and finds the various workstations where they are downloaded and available for use. RStudio for Windows 3.5, SAS 9.4, IBM SPSS Statistics 24.0, STATA version 18, Trend Micro OfficeScan 11.0, VLC media player 3.0, Wolfram Mathematica 11.3, Zotero 7, 7 Zip 16.0.4, ABBYY FineREADER PDF 16, Acrobat Pro, Adobe Express, ArcGIS Pro 3.0.3, Audacity 2.2, Beyond 2020 Professional Browser 7.0 SP4, Bloomberg Terminals, ChemOffice 15.1, EndNote 21, FFMpeg 2.2.2, Google Earth Pro, Adobe Illustrator, LAME for Windows 3.99.3, Adobe Lightroom, MATLAB R2017, MorningStar, NVivo 14, Adobe Photoshop, PopsTools 3.2.5, Adobe Premiere Pro, Python 3.2",
      resourceType: "McGill Service",
      icon: <Laptop className="w-5 h-5" />
    }
  ];

  const getSubscriptionTypeLabel = (type: string) => {
    switch (type) {
      case 'Free Subscription from McGill': return t.subscriptionTypeMcGillFree;
      case 'Free subscription from SSMU': return t.subscriptionTypeSSMUFree;
      case 'General Canadian Student Discount': return t.subscriptionTypeCanadianStudent;
      case 'McGill Service': return t.subscriptionTypeMcGillService;
      default: return type;
    }
  };

  const getSubscriptionTypeColor = (type: string) => {
    switch (type) {
      case 'Free Subscription from McGill': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Free subscription from SSMU': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'General Canadian Student Discount': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'McGill Service': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const onCampusStudySpaces: StudySpace[] = [
    {
      name: "Arts Computer Lounge",
      description: "24/7 Access to all Arts & ArtsSci students. Note: this building is hard to navigate at first and most of the hallways look the same so paying attention to the room number signs is key. This space is a bit dull but great if you want zero distractions especially at night.",
      address: "Ferrier Building"
    },
    {
      name: "Arts Lounge - Leacock Basement",
      description: "The center of all things AUS - Now with awesome murals done by your upper-year Arts Students! The main and back room have newly been updated this year with murals and better seating options making it great for a quick study session / review before a class in Leacock 132. P.S. it also has microwaves now. We also offer short-term Charger (USB-C/Macbook) and Laptop rentals for FREE (deposit required).",
      address: "McGill University - Leacock Building",
      capacity: "~45"
    },
    {
      name: "Arts Lounge - Ferrier",
      description: "24/7 Access Note this building is hard to navigate at first and most of the hallways look the same so paying attention to the room number signs is key. This space is a bit dull but great if you want zero distractions especially at night.",
      address: "Ferrier Building"
    },
    {
      name: "SSMU Building",
      description: "",
      address: ""
    },
    {
      name: "McConnel Eng Hallways",
      description: "There's a main hallway that every McGill student will eventually pass through at some point during their time here with high chairs facing the Internal Eng Parking lot and one facing a blank wall. There is also a less known one when you turn right when entering through the Milton Gates Entrance.",
      address: "McConnell Engineering Building"
    },
    {
      name: "Leacock Study Rooms",
      description: "Also good for classes in between Leacock classes but are also have private study rooms available (no need to book) with chalkboard and space for 2-3 people.",
      address: "First left as you enter through the door closest to Redpath / Islamic Library."
    },
    {
      name: "Geographic Information Centre",
      description: "If you're sick in Burnside basement but don't want to leave Math & Chem corner of campus take the elevator to the 5th floor of Burnside and you will find a large open space with a great view of lower campus from the windows. Many computer workstations (Windows) are also available. VP Comms Favourite",
      address: "Burnside Hall Floor 5"
    },
    {
      name: "Music Library Seminar Rooms",
      description: "Rooms A410, A412, A510, and A512 - If seminar rooms are free, they can be used on a first come, first served basis. *Priority to music students & faculty*",
      address: "Marvin Duchow Music Library, Floor 4 & 5"
    },
    {
      name: "SciLearn",
      description: "Space that supports first-year students taking science courses with daily drop-in study sessions (similar to prof. office hours but with student mentors rather than TA's) with TEAM mentors (2nd/3rd year students who excelled in their assigned course previously), and events focused on learning research. Courses supported: BIOL 111/112/201/202, CHEM 110/120/222, COMP 202, MATH 133/139/140/141, PHYS 101/102/141/142, PSYC 100/204/353, and MIMM 214.",
      address: "Burnside Hall Basement 1B23. Every day from 3-5PM but check instagram for schedule as it varies by day of the week"
    }
  ];

  const offCampusStudySpaces: StudySpace[] = [
    {
      name: "Leaves Café",
      description: "RUSS Favourite!",
      address: "",
      proximity: ""
    },
    {
      name: "Cathcart",
      description: "",
      address: "",
      proximity: ""
    },
    {
      name: "BanQ (Québec National Archives)",
      description: "",
      address: "",
      proximity: ""
    },
    {
      name: "Concordia Library",
      description: "",
      address: "",
      proximity: ""
    },
    {
      name: "Westmount Public Library",
      description: "",
      address: "",
      proximity: ""
    },
    {
      name: "Le Cartier Starbucks",
      description: "",
      address: "",
      proximity: ""
    },
    {
      name: "Osmo x Marusan",
      description: "RUSS Favourite!",
      address: "",
      proximity: ""
    },
    {
      name: "Amea Café",
      description: "Downtown large lobby café - great for coffee chats!",
      address: "",
      proximity: ""
    },
    {
      name: "Café Olimpico",
      description: "Open til 2am",
      address: "",
      proximity: ""
    }
  ];

  const deptLounges: StudySpace[] = [
    {
      name: "Arts",
      description: "",
      address: "Stephen Leacock Building Basement (B-12)",
      capacity: "~ 40"
    },
    {
      name: "Classics",
      description: "",
      address: "Leacock 817"
    },
    {
      name: "Computer Science",
      description: "",
      address: "Trottier 1060"
    },
    {
      name: "Cognitive Science",
      description: "The Student Association of Cognitive Science (SACS) lounge is open to all Cognitive Science students during our designated lounge hours. This is a space where students can come to connect, study, and socialize with other CogSci students. The lounge has 3 couches, a study desk, a microwave, coffee maker, and a black board for all your study (and non-study) needs. For more information, please consult our Lounge Hours on our Instagram, @cogsci_mcgill, or email communications.sacs@gmail.com!",
      address: "Leacock 923",
      capacity: "~20"
    },
    {
      name: "Environment",
      description: "",
      address: "3534 University"
    },
    {
      name: "Math",
      description: "",
      address: "Burnside 1B20"
    },
    {
      name: "Geography",
      description: "",
      address: "Burnside 312"
    },
    {
      name: "German",
      description: "",
      address: "Sherbrooke 680 Room 389"
    },
    {
      name: "International Development",
      description: "",
      address: "3610 McTavish"
    },
    {
      name: "Linguistics",
      description: "",
      address: "1085 Dr. Penfield"
    },
    {
      name: "Philosophy",
      description: "",
      address: "Leacock 931"
    },
    {
      name: "Psychology",
      description: "",
      address: "2001 McGill College Ave 4th Floor"
    },
    {
      name: "Liberal Arts",
      description: "",
      address: "Sherbrooke 680 Room 425"
    },
    {
      name: "Russian / Slavic Library",
      description: "The Slavic library includes many old books on russian and eastern european literary texts, as well as a common table, chairs, a microwave, and a tea kettle. The library is only accessible during executive hours, including help desk, conversation club and translation club. For information on those times please refer to our Instagram page @russmcgill or Facebook page @ Russian Undergraduate Students' Society.",
      address: "Sherbrooke 688 Room 309",
      capacity: "~ 15"
    },
    {
      name: "Caribbean and Latin American Studies and Hispanic Studies",
      description: "",
      address: "Sherbrooke 688 Room 389"
    },
    {
      name: "World Islamic & Middle Eastern Studies",
      description: "",
      address: "Morrice Hall (3485 McTavish)"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Food Options and Student Discounts Sections */}
      <Accordion type="multiple" className="w-full space-y-4">
        {/* Food Options Section */}
        <AccordionItem value="food-options" className="border rounded-lg px-6 py-4">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex flex-col items-start gap-1 w-full">
              <CardTitle className="flex items-center gap-2 text-left">
                <UtensilsCrossed className="w-6 h-6 text-red-600" />
                {t.foodOptionsTitle}
              </CardTitle>
              <CardDescription className="text-left">{t.foodOptionsSubtitle}</CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
          <Tabs defaultValue="on-campus" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="on-campus">{t.foodOptionsOnCampus}</TabsTrigger>
              <TabsTrigger value="off-campus">{t.foodOptionsOffCampus}</TabsTrigger>
            </TabsList>

            <TabsContent value="on-campus" className="space-y-4">
              <Accordion type="multiple" className="w-full">
                {Object.entries(groupByType(onCampusFoodOptions)).map(([type, options]) => {
                  if (options.length === 0) return null;
                  return (
                    <AccordionItem key={type} value={type} className="border rounded-lg mb-4 px-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-red-600" />
                          <span className="font-semibold">{getTypeLabel(type)}</span>
                          <Badge variant="outline" className="ml-2">{options.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                          {options.map((option, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                  <CardTitle className="text-lg">{option.name}</CardTitle>
                                  <Badge className={getTypeColor(option.type)}>
                                    {getTypeLabel(option.type)}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {option.description && (
                                  <p className="text-sm text-gray-600">{option.description}</p>
                                )}
                                {option.address && (
                                  <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{option.address}</span>
                                  </div>
                                )}
                                {option.priceRange && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="w-4 h-4 text-red-600" />
                                    <span className="text-gray-700 font-medium">{option.priceRange}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>

            <TabsContent value="off-campus" className="space-y-4">
              <p className="text-sm text-gray-600 mb-4 italic">{t.foodOptionsOffCampusNote}</p>
              <Accordion type="multiple" className="w-full">
                {Object.entries(groupByType(offCampusFoodOptions)).map(([type, options]) => {
                  if (options.length === 0) return null;
                  return (
                    <AccordionItem key={type} value={type} className="border rounded-lg mb-4 px-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-red-600" />
                          <span className="font-semibold">{getTypeLabel(type)}</span>
                          <Badge variant="outline" className="ml-2">{options.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                          {options.map((option, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                  <CardTitle className="text-lg">{option.name}</CardTitle>
                                  <Badge className={getTypeColor(option.type)}>
                                    {getTypeLabel(option.type)}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {option.description && (
                                  <p className="text-sm text-gray-600">{option.description}</p>
                                )}
                                {option.address && (
                                  <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{option.address}</span>
                                  </div>
                                )}
                                {option.priceRange && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="w-4 h-4 text-red-600" />
                                    <span className="text-gray-700 font-medium">{option.priceRange}</span>
                                  </div>
                                )}
              </CardContent>
            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
          </Tabs>
          </AccordionContent>
        </AccordionItem>

        {/* Student Discounts Section */}
        <AccordionItem value="student-discounts" className="border rounded-lg px-6 py-4">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex flex-col items-start gap-1 w-full">
              <CardTitle className="flex items-center gap-2 text-left">
                <Ticket className="w-6 h-6 text-red-600" />
                {t.studentDiscountsTitle}
              </CardTitle>
              <CardDescription className="text-left">{t.studentDiscountsSubtitle}</CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentDiscounts.map((discount, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg flex-1">{discount.name}</CardTitle>
                          <Badge className={getDiscountTypeColor(discount.resourceType)}>
                            {getDiscountTypeLabel(discount.resourceType)}
                          </Badge>
                        </div>
              </CardHeader>
                      <CardContent className="flex-1 space-y-3">
                        <p className="text-sm text-gray-600">{discount.description}</p>
                        {discount.note && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 italic">{discount.note}</p>
                          </div>
                        )}
              </CardContent>
            </Card>
                  ))}
                </div>
          </AccordionContent>
        </AccordionItem>

        {/* Subscriptions Section */}
        <AccordionItem value="subscriptions" className="border rounded-lg px-6 py-4">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex flex-col items-start gap-1 w-full">
              <CardTitle className="flex items-center gap-2 text-left">
                <CreditCard className="w-6 h-6 text-red-600" />
                {t.subscriptionsTitle}
              </CardTitle>
              <CardDescription className="text-left">{t.subscriptionsSubtitle}</CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription, index) => (
                <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200 hover:border-red-300 group bg-white w-full">
                  <CardHeader className="pb-4 space-y-4">
                    <div className="flex items-start gap-4 w-full">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 text-red-600 flex-shrink-0 shadow-sm">
                        {subscription.icon}
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <CardTitle className="text-lg font-bold leading-tight text-gray-900 mb-2 group-hover:text-red-700 transition-colors break-words">
                          {subscription.name}
                        </CardTitle>
                        <div className="w-full mt-2 flex flex-wrap">
                          <Badge className={`${getSubscriptionTypeColor(subscription.resourceType)} text-[10px] font-semibold px-2 py-1.5 break-words leading-tight whitespace-normal !whitespace-normal max-w-full`}>
                            {getSubscriptionTypeLabel(subscription.resourceType)}
                          </Badge>
                        </div>
                      </div>
                    </div>
              </CardHeader>
                  <CardContent className="flex-1 space-y-4 pt-0 w-full">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <p className="text-sm text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">
                      {subscription.description}
                    </p>
              </CardContent>
            </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Study Spaces Section */}
        <AccordionItem value="study-spaces" className="border rounded-lg px-6 py-4">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex flex-col items-start gap-1 w-full">
              <CardTitle className="flex items-center gap-2 text-left">
                <Library className="w-6 h-6 text-red-600" />
                {t.studySpacesTitle}
              </CardTitle>
              <CardDescription className="text-left">{t.studySpacesSubtitle}</CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            <Tabs defaultValue="on-campus" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="on-campus">{t.studySpacesOnCampus}</TabsTrigger>
                <TabsTrigger value="off-campus">{t.studySpacesOffCampus}</TabsTrigger>
                <TabsTrigger value="dept-lounges">{t.studySpacesDeptLounges}</TabsTrigger>
              </TabsList>

              <TabsContent value="on-campus" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {onCampusStudySpaces.map((space, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300 group bg-white w-full">
                      <CardHeader className="pb-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 text-red-600 flex-shrink-0 shadow-sm">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-bold leading-tight text-gray-900 mb-2 group-hover:text-red-700 transition-colors break-words">
                              {space.name}
                            </CardTitle>
                          </div>
                        </div>
              </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        {space.description && (
                          <>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                            <p className="text-sm text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">
                              {space.description}
                            </p>
                          </>
                        )}
                        {space.address && (
                          <div className="flex items-start gap-2 text-sm pt-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 break-words">{space.address}</span>
                          </div>
                        )}
                        {space.capacity && (
                          <div className="flex items-center gap-2 text-sm">
                            <UsersIcon className="w-4 h-4 text-red-600" />
                            <span className="text-gray-700 font-medium">{t.studySpacesCapacity}: {space.capacity}</span>
                          </div>
                        )}
              </CardContent>
            </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="off-campus" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {offCampusStudySpaces.map((space, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300 group bg-white w-full">
                      <CardHeader className="pb-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 text-red-600 flex-shrink-0 shadow-sm">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-bold leading-tight text-gray-900 mb-2 group-hover:text-red-700 transition-colors break-words">
                              {space.name}
                            </CardTitle>
                          </div>
                        </div>
              </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        {space.description && (
                          <>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                            <p className="text-sm text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">
                              {space.description}
                            </p>
                          </>
                        )}
                        {space.address && (
                          <div className="flex items-start gap-2 text-sm pt-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 break-words">{space.address}</span>
                          </div>
                        )}
                        {space.proximity && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="text-gray-700 font-medium">{t.studySpacesProximity}: {space.proximity}</span>
                          </div>
                        )}
              </CardContent>
            </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dept-lounges" className="space-y-4">
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">{t.studySpacesDeptNote}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {deptLounges.map((space, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300 group bg-white w-full">
                      <CardHeader className="pb-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 text-red-600 flex-shrink-0 shadow-sm">
                            <UsersIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-bold leading-tight text-gray-900 mb-2 group-hover:text-red-700 transition-colors break-words">
                              {space.name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        {space.description && (
                          <>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                            <p className="text-sm text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">
                              {space.description}
                            </p>
                          </>
                        )}
                        {space.address && (
                          <div className="flex items-start gap-2 text-sm pt-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 break-words">{space.address}</span>
                          </div>
                        )}
                        {space.capacity && (
                          <div className="flex items-center gap-2 text-sm">
                            <UsersIcon className="w-4 h-4 text-red-600" />
                            <span className="text-gray-700 font-medium">{t.studySpacesCapacity}: {space.capacity}</span>
          </div>
                        )}
        </CardContent>
      </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>

        {/* Room Booking Section */}
        <AccordionItem value="room-booking" className="border rounded-lg px-6 py-4">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex flex-col items-start gap-1 w-full">
              <CardTitle className="flex items-center gap-2 text-left">
                <DoorOpen className="w-6 h-6 text-red-600" />
                {t.roomBookingTitle}
              </CardTitle>
              <CardDescription className="text-left">{t.roomBookingSubtitle}</CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            <RoomBookingInterface language={language} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
