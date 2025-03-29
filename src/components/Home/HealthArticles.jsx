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
      <div className="p-6 max-w-4xl mx-auto border rounded-xl bg-background">
    <h2 className="text-3xl font-bold text-primary mb-6 text-center">Health Articles & Tips</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <div key={article.id} className="p-5 rounded-2xl border shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-secondary">{article.title}</h3>
          <p className="text-sm mb-3">{article.date}</p>
          <p className="">{article.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default HealthArticles;
