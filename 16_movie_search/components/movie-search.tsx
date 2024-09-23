"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react"; // Import useState and ChangeEvent from React
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CalendarIcon, StarIcon } from "lucide-react"; // Import icons from lucide-react
import Image from "next/image"; // Import Next.js Image component
import ClipLoader from "react-spinners/ClipLoader";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Define the MovieDetails type
type MovieDetails = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
};

export default function MovieSearch() {
  // State to manage the search term input by the user
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State to manage the movie details retrieved from the API
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  // State to manage the loading state of the API call
  const [loading, setLoading] = useState<boolean>(false);

  // State to manage any error messages from the API
  const [error, setError] = useState<string | null>(null);

  // Function to handle the search button click:
  const handleSearch = async (): Promise<void> => {
    // Set the loading state to true
    setLoading(true);
    // Set the error state to null
    setError(null);
    // Set the movie details state to null
    setMovieDetails(null);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      // Set movie details state with the fetched data
      setMovieDetails(data);
    } catch (error: any) {
      setError(error.message); // Set error state with the error message
    } finally {
      // Set loading to false after fetching data
      setLoading(false);
    }
  };

  // Function to handle changes in the search input field
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
    <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Title of the Movie Search component */}
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        Movie Search
      </h1>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
        Find details about your favorite movies!
      </p>
      
      <div className="flex items-center mb-6">
        {/* Search input field */}
        <Input
          type="text"
          placeholder="Enter a movie title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
        />
        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          Search
        </Button>
      </div>
  
      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center mb-6">
          <ClipLoader className="w-8 h-8 text-green-500" />
        </div>
      )}
  
      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}. Please try another movie.
        </div>
      )}
  
      {/* Movie details */}
      {movieDetails && (
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            {/* Movie poster image */}
            <Image
              src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.svg"}
              alt={movieDetails.Title}
              width={200}
              height={300}
              className="rounded-md shadow-md mx-auto"
            />
          </div>
          <div className="w-full text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {movieDetails.Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">{movieDetails.Plot}</p>
  
            {/* Movie details section */}
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>{movieDetails.Year}</span>
            </div>
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <StarIcon className="w-5 h-5 mr-2 text-yellow-400" />
              <span>{movieDetails.imdbRating}</span>
            </div>
  
            {/* New Movie Details: Genre, Director, Actors, Runtime, Released */}
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <span className="mr-4">
                <strong>Genre:</strong> {movieDetails.Genre}
              </span>
            </div>
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <span className="mr-4">
                <strong>Director:</strong> {movieDetails.Director}
              </span>
            </div>
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <span className="mr-4">
                <strong>Actors:</strong> {movieDetails.Actors}
              </span>
            </div>
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <span className="mr-4">
                <strong>Runtime:</strong> {movieDetails.Runtime}
              </span>
            </div>
            <div className="flex justify-center items-center text-gray-500 dark:text-gray-300 mb-2">
              <span className="mr-4">
                <strong>Released:</strong> {movieDetails.Released}
              </span>
            </div>
          </div>
        </div>
      )}
  
      {/* Social media icons */}
      <div className="mt-8 flex justify-center space-x-6">
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
    </div>
  </div>
  
  
  
  );
}
