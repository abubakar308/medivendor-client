
const articles = [
    {
      id: 1,
      title: "5 Tips for a Healthy Lifestyle",
      description: "Discover simple ways to maintain a healthy lifestyle with these five easy tips.",
      date: "2025-02-08",
    },
    {
      id: 2,
      title: "Importance of Staying Hydrated",
      description: "Learn why hydration is essential for your body and how much water you should drink daily.",
      date: "2025-02-07",
    },
    {
      id: 3,
      title: "Best Foods for a Strong Immune System",
      description: "Boost your immunity with these nutrient-rich foods recommended by experts.",
      date: "2025-02-06",
    },
  ];
const HealthArticles = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto border rounded-xl">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Health Articles & Tips</h2>
      <div className="grid gap-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-base-100 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.date}</p>
            <p className="text-gray-700">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default HealthArticles;