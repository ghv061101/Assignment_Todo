// src/utils/github.js
export const createGist = async (token, fileName, content) => {
    const apiUrl = "https://api.github.com/gists";
  
    const gistData = {
      description: `Summary of project: ${fileName}`,
      public: false, // Change to `true` if you want the Gist to be public
      files: {
        [fileName]: {
          content,
        },
      },
    };
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gistData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create the Gist");
    }
  
    const data = await response.json();
    return data.html_url; // URL of the created Gist
  };
  