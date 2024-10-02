"use client"; // Enables client-side rendering for this component

import React, { useState, FormEvent } from "react"; // Import useState and FormEvent from React
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { Card, CardContent } from "@/components/ui/card"; // Import custom Card components
import Link from "next/link"; // Import Link component from Next.js
import { SearchIcon } from "lucide-react"; // Import SearchIcon from lucide-react
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image"; // Import Next.js Image component
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface Recipe {
  // A unique identifier for the recipe.
  uri: string;
  // The name of the recipe.
  label: string;
  // The image of the recipe.
  image: string;
  // An array of ingredients for the recipe.
  ingredientLines: string[];
  // An array of objects, where each object contains a text field with ingredient info.
  ingredients: { text: string }[];
  // The URL of the recipe.
  url: string;
}

const examples = [
  "Biryani",
  "Chicken Karahi",
  "Nihari",
  "Haleem",
  "Chapli Kabab",
];

export default function RecipeSearch() {
  // Holds the search input from the user (e.g., "Biryani").
  const [query, setQuery] = useState<string>("");
  //  An array to store the fetched recipe results.
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // A boolean to indicate if the search is in progress.
  const [loading, setLoading] = useState<boolean>(false);
  //    A boolean to track if the user has performed a search.
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    // Sets the loading state to true to show the user that the data is being fetched.
    setLoading(true);
    // Updates the state to indicate that a search has been performed.
    setSearched(true);
    // Clears any previously displayed recipes before performing the new search.
    setRecipes([]);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits.map((hit: { recipe: Recipe }) => hit.recipe));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  // JSX return statement rendering the Recipe Search UI
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 ">
      <div className="flex flex-col h-full w-full max-w-6xl mx-auto p-4 md:p-6 ">
        {/* Header section */}
        <header className="flex flex-col items-center mb-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Recipe Search</h1>
          <p className="text-lg mb-4">
            Find delicious recipes by ingredients you have at home.
          </p>
          {/* Example search terms */}
          <div className="mb-4">
            <p>Try searching for:</p>
            <div className="flex space-x-2 text-black">
              {examples.map((example) => (
                <span
                  key={example}
                  className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
          {/* Search form */}
          <form
            className="relative w-full max-w-md mb-6 text-black"
            onSubmit={handleSearch}
          >
            <Input
              type="search"
              placeholder="Search by ingredient..."
              className="pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </form>
        </header>
        {/* Loading spinner */}
        {loading ? (
          <div className="flex flex-col justify-center items-center w-full h-full text-white">
            <ClipLoader className="w-10 h-10 mb-4" />
            <p>Loading recipes, please wait...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Message for no recipes found */}
            {searched && recipes.length === 0 && (
              <p>No recipes found. Try searching with different ingredients.</p>
            )}
            {/* Display list of recipes */}
            {recipes.map((recipe) => (
              <Card className="group relative" key={recipe.uri}>
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  width={400}
                  height={300}
                  className="rounded-t-lg object-cover w-full h-48 group-hover:opacity-50 transition-opacity"
                />
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {recipe.ingredientLines.join(", ")}
                  </p>
                </CardContent>
                <Link
                  href={recipe.url}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View recipe</span>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* Social media icons */}

      <div className="mt-8 flex justify-center space-x-5">
        <a
          href="https://github.com/SabehShaikh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/sabeh-shaikh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
      {/* Made by Sabeh Shaikh */}
      <div className="mt-3  text-center text-sm text-gray-400">
        Made by Sabeh Shaikh
      </div>
    </div>
  );
}
