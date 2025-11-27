export default function MenuPage() {
    const menuCategories = [
        {
            name: 'Starters',
            items: [
                { name: 'Truffle Arancini', description: 'Crispy risotto balls with black truffle and mozzarella.', price: '$14' },
                { name: 'Burrata & Heirloom Tomato', description: 'Fresh basil pesto, balsamic glaze, toasted pine nuts.', price: '$18' },
                { name: 'Wagyu Beef Carpaccio', description: 'Parmesan shavings, capers, truffle oil, arugula.', price: '$22' },
            ]
        },
        {
            name: 'Mains',
            items: [
                { name: 'Pan-Seared Scallops', description: 'Cauliflower purée, crispy pancetta, lemon butter sauce.', price: '$34' },
                { name: 'Wild Mushroom Risotto', description: 'Arborio rice, porcini mushrooms, parmesan, white wine.', price: '$28' },
                { name: 'Herb-Crusted Lamb Rack', description: 'Fondant potatoes, seasonal vegetables, red wine jus.', price: '$42' },
                { name: 'Miso Glazed Black Cod', description: 'Bok choy, ginger dashi, sesame seeds.', price: '$38' },
            ]
        },
        {
            name: 'Desserts',
            items: [
                { name: 'Dark Chocolate Fondant', description: 'Molten center, vanilla bean ice cream.', price: '$14' },
                { name: 'Lemon Basil Tart', description: 'Meringue kisses, raspberry coulis.', price: '$12' },
                { name: 'Artisan Cheese Board', description: 'Selection of local cheeses, honeycomb, crackers.', price: '$20' },
            ]
        },
        {
            name: 'Drinks',
            items: [
                { name: 'Signature Old Fashioned', description: 'Bourbon, smoked maple syrup, angostura bitters.', price: '$16' },
                { name: 'Yuzu & Gin Fizz', description: 'Gin, yuzu juice, egg white, soda.', price: '$15' },
                { name: 'House Red / White', description: 'Ask your server for our current selection.', price: '$12' },
            ]
        }
    ]

    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">Our Menu</h1>
                    <p className="text-lg text-stone-600 dark:text-stone-400">
                        A culinary journey through seasonal flavors and modern techniques.
                    </p>
                </div>

                <div className="space-y-16">
                    {menuCategories.map((category) => (
                        <section key={category.name}>
                            <h2 className="text-3xl font-serif font-bold text-orange-600 mb-8 border-b border-stone-200 dark:border-stone-800 pb-2 inline-block">
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {category.items.map((item) => (
                                    <div key={item.name} className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-semibold text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <span className="text-lg font-medium text-stone-500 dark:text-stone-400">{item.price}</span>
                                        </div>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
