import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://agile-mole-219.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default convex; 
