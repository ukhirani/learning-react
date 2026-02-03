import { Card, Typography, Box, Button, Chip } from "@mui/material";

export function ProductCard({ product }) {
  return (
    <Card className="flex flex-row items-center" variant="outlined">
      <Box
        className="p-2"
        component="img"
        sx={{
          height: "auto",
          width: "100%",
          maxHeight: { xs: 90, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          objectFit: "contain",
        }}
        alt={product.title}
        src={product.image}
      />

      <div className="ml-4 py-2 border-l-2 border-gray-200 h-50 pl-4 flex flex-col gap-2 flex-1">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="font-bold"
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            {product.title}
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ₹ {product.price}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          sx={{
            color: "black",
            bgcolor: "background.paper",
            fontWeight: "bold",
            borderRadius: "20px",
            width: "fit-content",
          }}
          onClick={() => console.log("add to cart clicked")}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

// Function to handle adding the product to the cart
const addToCart = (product) => {
  // Logic to add the product to the cart
  console.log(`${product.title} added to cart`);
};
