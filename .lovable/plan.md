# Add the Crayon Sign to the Coloring Page

## Goal
Make the hand-drawn "Vote Keith Gettmann / I Promise this isn't Ai. Read More" crayon sign visible on the `/coloring` page, since it is the piece that will lead people to the site. It should appear as a supporting section rather than the hero, and the photo will be cropped and brightened before it is used.

## Steps

1. **Prepare the photo**  
   - Crop and brighten `IMG_1436.jpeg` to center the sign and make the crayon text pop.  
   - Export a clean, web-ready version.

2. **Upload to Lovable Assets**  
   - Create a CDN asset pointer from the edited image and store it in the project (no binary left in the repo).

3. **Add a supporting section to `/coloring`**  
   - Insert a new section on `src/pages/Coloring.tsx` below the hero and above the existing downloads.  
   - Show the cropped sign as the focal visual.  
   - Pair it with a short, on-brand heading that connects the physical sign to the page (e.g. "Saw the sign? This is the rest.") and the existing "This part is definitely not AI" aside.  
   - Keep the current navy/gold brand styling and the crayon underline accent.

4. **Verify**  
   - Build the project and confirm the new section renders cleanly on desktop and mobile.  
   - Check the image loads from the CDN and the page still functions correctly.
