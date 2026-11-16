(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search Maine Coon Heaven kittens by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://DOMAIN.com/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/shop/${category}/` : `https://DOMAIN.com/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp kitten reservation. Free delivery across Australia. Human completes.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? `https://wa.me/+61401667279?text=${encodeURIComponent(message)}` : `https://wa.me/+61401667279`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "contact",
        description: "Contact Maine Coon Heaven for kitten questions or adoption inquiries",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/contact/`;
          return { url: `https://DOMAIN.com/contact/` };
        }
      }
    ]
  });
})();
