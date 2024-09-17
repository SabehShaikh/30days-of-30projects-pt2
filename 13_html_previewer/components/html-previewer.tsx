// Enables client-side rendering
"use client";

import React, { useState, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// Import predefined HTML content
import { predefinedHtml } from "./predefinedHtml";

// Default export of the HTMLPreviewComponent function
export default function HtmlPreviewer() {
  // State to hold the HTML code typed by the user
  const [html, setHtml] = useState<string>("");

  // State to hold the HTML code that will be previewed
  const [previewHtml, setPreviewHtml] = useState<string>("");

  // Function to handle changes in the textarea
  const handleHtmlChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(event.target.value); // Update the html state with the new textarea value
  };

  // Function to set previewHtml to the current html state
  const handlePreview = () => {
    setPreviewHtml(html); // Set the previewHtml to what is currently in html
  };

  // Function to set previewHtml to predefined HTML content
  const handlePasteHtml = () => {
    setHtml(predefinedHtml); // Set previewHtml to the predefined HTML
  };

  // JSX return statement rendering the HTML previewer UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      {/* Center the HTML previewer card within the screen */}
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-card">
        <h1 className="text-2xl font-bold mb-4 text-center">HTML Previewer</h1>
        <p className="text-muted-foreground mb-4 text-center">
          Enter your HTML code and see the preview.
        </p>
        <div className="grid gap-4">
          {/* Textarea for entering HTML code */}
          <Textarea
            value={html}
            onChange={handleHtmlChange}
            placeholder="Enter your HTML code here..."
            className="p-4 rounded-lg border border-input bg-background text-foreground"
            rows={8}
          />
          {/* Buttons to generate preview and paste predefined HTML */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Button onClick={handlePreview}>Generate Preview</Button>
              <Button onClick={handlePasteHtml}>Paste HTML</Button>
            </div>
          </div>
       {/* Scrollable preview div */}
       <div
            className="p-4 rounded-lg border border-input bg-background text-foreground"
            style={{
              maxHeight: "400px", // Limit the height to make it scrollable
              overflowY: "auto", // Enable scrolling
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      </div>

      {/* Social media icons */}
      <div className="mt-8 flex justify-center space-x-4">
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
          className="text-blue-600 dark:text-white dark:hover:text-blue-500"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </div>
  );
}