import '../models/category.dart';
import '../models/food.dart';
import '../models/user.dart';
import '../models/address.dart';
import '../models/payment_method.dart';
import '../models/notification_item.dart';
import '../models/order.dart';
import '../models/cart_item.dart';

class MockData {
  static final User currentUser = User(
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+880 1712 345678',
    profileImageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  );

  static final List<Address> addresses = [
    Address(
      id: 'a1',
      title: 'Home',
      fullAddress: '123 Main Street, Gulshan-2',
      city: 'Dhaka, Bangladesh',
      phone: '+880 1712 345678',
      isDefault: true,
    ),
    Address(
      id: 'a2',
      title: 'Work',
      fullAddress: 'ABC Tower, Level 8, Banani',
      city: 'Dhaka, Bangladesh',
      phone: '+880 1819 876543',
      isDefault: false,
    ),
  ];

  static final List<PaymentCard> paymentCards = [
    PaymentCard(
      id: 'p1',
      cardHolder: 'John Doe',
      cardNumber: '4532 8921 7845 4582',
      expiryDate: '09/28',
      cardType: 'visa',
      isDefault: true,
    ),
    PaymentCard(
      id: 'p2',
      cardHolder: 'John Doe',
      cardNumber: '5412 7532 9812 7821',
      expiryDate: '11/27',
      cardType: 'mastercard',
      isDefault: false,
    ),
  ];

  static final List<NotificationItem> notifications = [
    NotificationItem(
      id: 'n1',
      title: 'Order Preparing',
      message: 'Your order #ORD-7A9B is being prepared fresh in the kitchen.',
      time: DateTime.now().subtract(const Duration(minutes: 15)),
      type: NotificationType.order,
    ),
    NotificationItem(
      id: 'n2',
      title: 'Special 20% OFF Offer!',
      message: 'Use promo code WELCOME20 on your next order to get 20% off!',
      time: DateTime.now().subtract(const Duration(hours: 3)),
      type: NotificationType.promo,
    ),
    NotificationItem(
      id: 'n3',
      title: 'Order Delivered',
      message: 'Order #ORD-5E2A was delivered successfully. Enjoy your meal!',
      time: DateTime.now().subtract(const Duration(days: 1)),
      isRead: true,
      type: NotificationType.order,
    ),
    NotificationItem(
      id: 'n4',
      title: 'New Menu Additions',
      message: 'Try our brand new Truffle Mushroom Pasta and Strawberry Shake.',
      time: DateTime.now().subtract(const Duration(days: 2)),
      isRead: true,
      type: NotificationType.system,
    ),
  ];

  static final List<Category> categories = [
    Category(id: 'c1', name: 'Burgers', iconUrl: 'assets/icons/burger.png'),
    Category(id: 'c2', name: 'Pizza', iconUrl: 'assets/icons/pizza.png'),
    Category(id: 'c3', name: 'Chicken', iconUrl: 'assets/icons/chicken.png'),
    Category(id: 'c4', name: 'Pasta', iconUrl: 'assets/icons/pasta.png'),
    Category(id: 'c5', name: 'Desserts', iconUrl: 'assets/icons/dessert.png'),
    Category(id: 'c6', name: 'Drinks', iconUrl: 'assets/icons/drink.png'),
  ];

  static final List<Food> foods = [
    Food(
      id: 'f1',
      name: 'Classic Cheeseburger',
      description:
          'Juicy prime beef patty with melted cheddar cheese, crisp lettuce, ripe tomato, pickles, and our signature secret house sauce.',
      price: 8.99,
      imageUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 320,
      categoryId: 'c1',
      prepTime: '15-20 min',
      calories: 520,
      ingredients: [
        'Prime Beef',
        'Cheddar Cheese',
        'Crisp Lettuce',
        'Ripe Tomato',
        'Brioche Bun',
        'Secret Sauce',
      ],
      addOns: [
        FoodAddOn(id: 'ao1', name: 'Extra Cheddar Cheese', price: 1.50),
        FoodAddOn(id: 'ao2', name: 'Crispy Smoked Bacon', price: 2.00),
        FoodAddOn(id: 'ao3', name: 'Grilled Jalapeños', price: 1.00),
        FoodAddOn(id: 'ao4', name: 'Extra House Sauce', price: 0.75),
      ],
      isFavorite: true,
    ),
    Food(
      id: 'f2',
      name: 'Double Bacon BBQ Burger',
      description:
          'Two flame-grilled beef patties stacked with crispy applewood bacon, double cheddar, caramelized onions, and smoky BBQ glaze.',
      price: 11.99,
      imageUrl:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 215,
      categoryId: 'c1',
      prepTime: '18-22 min',
      calories: 780,
      ingredients: [
        'Double Beef Patty',
        'Applewood Bacon',
        'Aged Cheddar',
        'Caramelized Onions',
        'BBQ Sauce',
      ],
      addOns: [
        FoodAddOn(id: 'ao5', name: 'Extra Bacon Strips', price: 2.50),
        FoodAddOn(id: 'ao6', name: 'Fried Egg', price: 1.25),
        FoodAddOn(id: 'ao7', name: 'Truffle Aioli', price: 1.50),
      ],
    ),
    Food(
      id: 'f3',
      name: 'Artisan Margherita Pizza',
      description:
          'Hand-tossed sourdough pizza topped with crushed San Marzano tomato sauce, fresh mozzarella di bufala, and fragrant basil leaves.',
      price: 14.50,
      imageUrl:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      reviews: 450,
      categoryId: 'c2',
      prepTime: '20-25 min',
      calories: 640,
      ingredients: [
        'San Marzano Tomatoes',
        'Fresh Mozzarella',
        'Extra Virgin Olive Oil',
        'Fresh Basil',
        'Sourdough Crust',
      ],
      addOns: [
        FoodAddOn(id: 'ao8', name: 'Extra Buffalo Mozzarella', price: 2.00),
        FoodAddOn(id: 'ao9', name: 'Hot Honey Drizzle', price: 1.25),
        FoodAddOn(id: 'ao10', name: 'Olives & Capers', price: 1.50),
      ],
      isFavorite: true,
    ),
    Food(
      id: 'f4',
      name: 'Pepperoni Supreme Pizza',
      description:
          'Loaded with artisanal beef pepperoni, double mozzarella, spicy marinara, and Italian oregano on our signature crispy crust.',
      price: 16.99,
      imageUrl:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 512,
      categoryId: 'c2',
      prepTime: '20-25 min',
      calories: 820,
      ingredients: [
        'Beef Pepperoni',
        'Whole Milk Mozzarella',
        'Spicy Marinara',
        'Italian Herbs',
      ],
      addOns: [
        FoodAddOn(id: 'ao11', name: 'Double Pepperoni', price: 2.50),
        FoodAddOn(id: 'ao12', name: 'Stuffed Crust with Cheese', price: 3.00),
        FoodAddOn(id: 'ao13', name: 'Garlic Butter Dip', price: 1.00),
      ],
    ),
    Food(
      id: 'f5',
      name: 'Crispy Buffalo Wings',
      description:
          'Tender chicken wings fried to golden perfection and glazed in tangy authentic Buffalo sauce, served with cool ranch.',
      price: 10.99,
      imageUrl:
          'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop',
      rating: 4.6,
      reviews: 280,
      categoryId: 'c3',
      prepTime: '15-18 min',
      calories: 460,
      ingredients: [
        'Chicken Wings',
        'Buffalo Glaze',
        'House Ranch',
        'Celery Sticks',
      ],
      addOns: [
        FoodAddOn(id: 'ao14', name: 'Blue Cheese Dip', price: 1.00),
        FoodAddOn(id: 'ao15', name: 'Extra 4 Wings', price: 4.00),
        FoodAddOn(id: 'ao16', name: 'Seasoned French Fries', price: 2.50),
      ],
    ),
    Food(
      id: 'f6',
      name: 'Nashville Hot Chicken Sandwich',
      description:
          'Extra crispy buttermilk fried chicken breast dusted in spicy Nashville pepper oil, creamy slaw, and pickles on a toasted bun.',
      price: 9.50,
      imageUrl:
          'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      reviews: 390,
      categoryId: 'c3',
      prepTime: '15-20 min',
      calories: 610,
      ingredients: [
        'Buttermilk Chicken',
        'Nashville Hot Oil',
        'Creamy Slaw',
        'Dill Pickles',
        'Brioche Bun',
      ],
      addOns: [
        FoodAddOn(id: 'ao17', name: 'Extra Hot Spice Level', price: 0.50),
        FoodAddOn(id: 'ao18', name: 'Melted Pepper Jack Cheese', price: 1.25),
      ],
      isFavorite: true,
    ),
    Food(
      id: 'f7',
      name: 'Creamy Spaghetti Carbonara',
      description:
          'Silky pasta tossed in rich egg yolk emulsion, crispy cured pancetta, freshly grated Pecorino Romano, and cracked black pepper.',
      price: 13.99,
      imageUrl:
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 150,
      categoryId: 'c4',
      prepTime: '15-20 min',
      calories: 690,
      ingredients: [
        'Bronze-cut Spaghetti',
        'Cured Pancetta',
        'Fresh Egg Yolks',
        'Pecorino Romano',
        'Black Pepper',
      ],
      addOns: [
        FoodAddOn(id: 'ao19', name: 'Extra Pancetta', price: 2.50),
        FoodAddOn(id: 'ao20', name: 'Garlic Herb Bread', price: 2.00),
        FoodAddOn(id: 'ao21', name: 'Fresh Shaved Truffle', price: 3.50),
      ],
    ),
    Food(
      id: 'f8',
      name: 'Spicy Penne Arrabbiata',
      description:
          'Al dente penne pasta in an intense slow-cooked plum tomato sauce infused with garlic, red chili flakes, and Italian parsley.',
      price: 11.50,
      imageUrl:
          'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&auto=format&fit=crop',
      rating: 4.5,
      reviews: 120,
      categoryId: 'c4',
      prepTime: '12-16 min',
      calories: 490,
      ingredients: [
        'Penne Rigate',
        'Plum Tomatoes',
        'Minced Garlic',
        'Calabrian Chilies',
        'Fresh Parsley',
      ],
      addOns: [
        FoodAddOn(id: 'ao22', name: 'Grilled Chicken Strips', price: 3.00),
        FoodAddOn(id: 'ao23', name: 'Grated Parmesan', price: 1.00),
      ],
    ),
    Food(
      id: 'f9',
      name: 'Molten Chocolate Lava Cake',
      description:
          'Decadent warm Belgian dark chocolate cake with a rich molten center, served with a scoop of premium Madagascar vanilla bean ice cream.',
      price: 7.99,
      imageUrl:
          'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop',
      rating: 4.9,
      reviews: 420,
      categoryId: 'c5',
      prepTime: '10-12 min',
      calories: 480,
      ingredients: [
        'Belgian Dark Chocolate',
        'Vanilla Bean Gelato',
        'Creamery Butter',
        'Organic Eggs',
      ],
      addOns: [
        FoodAddOn(id: 'ao24', name: 'Extra Vanilla Scoop', price: 1.75),
        FoodAddOn(id: 'ao25', name: 'Warm Salted Caramel Sauce', price: 1.00),
      ],
      isFavorite: true,
    ),
    Food(
      id: 'f10',
      name: 'New York Strawberry Cheesecake',
      description:
          'Velvety smooth Philadelphia cream cheese filling on a buttery honey graham cracker crust, crowned with glazed ripe strawberries.',
      price: 6.50,
      imageUrl:
          'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      reviews: 310,
      categoryId: 'c5',
      prepTime: '5-8 min',
      calories: 390,
      ingredients: [
        'Philadelphia Cream Cheese',
        'Graham Crackers',
        'Fresh Strawberries',
        'Vanilla Extract',
      ],
      addOns: [
        FoodAddOn(id: 'ao26', name: 'Whipped Cream', price: 0.75),
        FoodAddOn(id: 'ao27', name: 'Berry Coulis', price: 1.00),
      ],
    ),
    Food(
      id: 'f11',
      name: 'Iced Caramel Macchiato',
      description:
          'Bold espresso poured over chilled whole milk and sweet Madagascar vanilla syrup, finished with a luscious buttery caramel drizzle.',
      price: 4.99,
      imageUrl:
          'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 180,
      categoryId: 'c6',
      prepTime: '5 min',
      calories: 230,
      ingredients: [
        'Arabica Espresso',
        'Whole Milk',
        'Vanilla Syrup',
        'Caramel Drizzle',
      ],
      addOns: [
        FoodAddOn(id: 'ao28', name: 'Oat Milk Substitute', price: 0.75),
        FoodAddOn(id: 'ao29', name: 'Extra Espresso Shot', price: 1.00),
      ],
    ),
    Food(
      id: 'f12',
      name: 'Fresh Mint Lemonade',
      description:
          'Freshly squeezed Meyer lemons blended with crushed spearmint leaves, cane sugar syrup, and crushed ice. Refreshing and zesty.',
      price: 3.50,
      imageUrl:
          'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
      rating: 4.5,
      reviews: 95,
      categoryId: 'c6',
      prepTime: '5 min',
      calories: 120,
      ingredients: ['Meyer Lemons', 'Fresh Mint', 'Cane Sugar', 'Purified Ice'],
      addOns: [
        FoodAddOn(id: 'ao30', name: 'Chia Seeds', price: 0.50),
        FoodAddOn(id: 'ao31', name: 'Ginger Infusion', price: 0.75),
      ],
    ),
    Food(
      id: 'f13',
      name: 'Avocado Green Veggie Burger',
      description:
          'Hearty quinoa and black bean patty topped with sliced avocado, pickled red onions, baby spinach, and creamy green goddess sauce.',
      price: 9.99,
      imageUrl:
          'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=600&auto=format&fit=crop',
      rating: 4.4,
      reviews: 145,
      categoryId: 'c1',
      prepTime: '15-18 min',
      calories: 440,
      ingredients: [
        'Quinoa & Black Bean Patty',
        'Ripe Avocado',
        'Baby Spinach',
        'Vegan Multigrain Bun',
      ],
      addOns: [
        FoodAddOn(id: 'ao32', name: 'Vegan Cheese Slice', price: 1.25),
        FoodAddOn(id: 'ao33', name: 'Grilled Mushrooms', price: 1.50),
      ],
    ),
    Food(
      id: 'f14',
      name: 'Smoky BBQ Chicken Pizza',
      description:
          'Slow-smoked chicken tenders, hickory BBQ sauce base, thinly sliced red onions, fresh cilantro, and smoked gouda cheese blend.',
      price: 15.99,
      imageUrl:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      reviews: 375,
      categoryId: 'c2',
      prepTime: '20-25 min',
      calories: 760,
      ingredients: [
        'Smoked Chicken',
        'Hickory BBQ Sauce',
        'Red Onions',
        'Smoked Gouda',
        'Cilantro',
      ],
      addOns: [
        FoodAddOn(id: 'ao34', name: 'Pineapple Tidbits', price: 1.25),
        FoodAddOn(id: 'ao35', name: 'Extra Smoked Gouda', price: 2.00),
      ],
    ),
    Food(
      id: 'f15',
      name: 'Creamy Strawberry Milkshake',
      description:
          'Hand-churned thick shake prepared with ripe California strawberries, whole milk, and rich strawberry gelato, topped with whipped cream.',
      price: 5.50,
      imageUrl:
          'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop',
      rating: 4.7,
      reviews: 210,
      categoryId: 'c6',
      prepTime: '5 min',
      calories: 340,
      ingredients: [
        'California Strawberries',
        'Strawberry Gelato',
        'Whole Milk',
        'Whipped Cream',
      ],
      addOns: [
        FoodAddOn(id: 'ao36', name: 'Rainbow Sprinkles', price: 0.50),
        FoodAddOn(id: 'ao37', name: 'Strawberry Waffle Roll', price: 1.00),
      ],
    ),
  ];

  static List<Order> getInitialOrders() {
    return [
      Order(
        id: 'ORD-7A9B',
        date: DateTime.now().subtract(const Duration(minutes: 20)),
        items: [
          CartItem(
            id: 'ci1',
            food: foods[0], // Classic Cheeseburger
            quantity: 2,
            specialInstructions: 'No pickles please',
          ),
          CartItem(
            id: 'ci2',
            food: foods[10], // Iced Caramel Macchiato
            quantity: 1,
          ),
        ],
        total: 27.97,
        status: OrderStatus.preparing,
        deliveryAddress: '123 Main Street, Gulshan-2, Dhaka',
        paymentMethod: 'Visa •••• 4582',
        estimatedDeliveryTime: '20 - 30 mins',
      ),
      Order(
        id: 'ORD-5E2A',
        date: DateTime.now().subtract(const Duration(hours: 3)),
        items: [
          CartItem(
            id: 'ci3',
            food: foods[2], // Margherita Pizza
            quantity: 1,
          ),
          CartItem(
            id: 'ci4',
            food: foods[4], // Fried Wings
            quantity: 1,
          ),
          CartItem(
            id: 'ci5',
            food: foods[8], // Chocolate Lava Cake
            quantity: 1,
          ),
        ],
        total: 38.48,
        status: OrderStatus.onTheWay,
        deliveryAddress: 'ABC Tower, Level 8, Banani, Dhaka',
        paymentMethod: 'Mastercard •••• 7821',
        estimatedDeliveryTime: '5 - 10 mins',
      ),
      Order(
        id: 'ORD-3C1F',
        date: DateTime.now().subtract(const Duration(days: 2, hours: 4)),
        items: [
          CartItem(
            id: 'ci6',
            food: foods[6], // Spaghetti Carbonara
            quantity: 2,
          ),
          CartItem(
            id: 'ci7',
            food: foods[11], // Fresh Lemonade
            quantity: 2,
          ),
        ],
        total: 39.98,
        status: OrderStatus.delivered,
        deliveryAddress: '123 Main Street, Gulshan-2, Dhaka',
        paymentMethod: 'Cash on Delivery',
        estimatedDeliveryTime: 'Delivered',
      ),
    ];
  }
}
