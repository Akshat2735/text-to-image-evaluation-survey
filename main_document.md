# Text-to-Image Evaluation Survey: India-Relevant Product Imagery

## Executive summary

This project evaluates how well text-to-image systems generate product imagery for Indian products and contexts. I selected four everyday product categories: copper water bottles, Kanjeevaram silk sarees, Kolhapuri leather chappals, and stainless-steel Indian tiffin boxes. Participants compared four anonymized image outputs per prompt and rated each output on relevance, visual quality, and India-fit, then selected an overall favorite.

The pilot currently contains two completed participant responses. Across eight prompt-level choices, model C received four overall-favorite selections, model A received three, model B received one, and model D received none. These results are directional only because the sample is very small. The most useful finding is that model preference depends on the category: C led for Saree, A led for Shoes, Bottle was split between A and C, and Tiffin was split between B and C.

## 1. What evaluation I chose

I chose a human preference evaluation of text-to-image outputs for Indian product photography. The evaluation combines:

- **Per-image ratings:** Relevance, Visual Quality, and India-fit on a 1-5 star scale.
- **Forced preference:** One overall favorite, selected from A, B, C, or D.
- **Category comparison:** The same evaluation structure is repeated across four product prompts.

The image labels shown to participants are neutral letters only. The evaluation does not reveal which underlying model or generation system produced A, B, C, or D, reducing direct brand or model-name bias.

## 2. Category and use case

The category is **Indian product imagery for e-commerce and catalog-style use**. The four use cases are:

1. A copper water bottle with a brass cap.
2. A handwoven Kanjeevaram silk saree displayed on a wooden mannequin.
3. Kolhapuri leather chappals presented as an online fashion listing.
4. A stainless-steel Indian tiffin box with three compartments.

The intended use case is an image-generation system that helps Indian sellers, marketplaces, catalog teams, and small businesses create product visuals from text prompts. These images need to represent the requested object accurately, look professionally usable, and reflect the product's cultural and regional context.

## 3. Why I chose this evaluation

Product imagery is a practical, visible test of text-to-image quality. It requires more than producing a visually attractive picture: the generated image must contain the requested product, follow the composition and lighting instructions, and preserve details that make the product recognizable.

The four categories also create different challenges. A bottle tests shape, materials, and catalog composition. A saree tests textile appearance, draping, and cultural specificity. Kolhapuri chappals test recognizable footwear design and lifestyle composition. A tiffin box tests object structure, compartments, stainless-steel material, and clean product presentation.

Using several categories prevents the evaluation from becoming a single-image beauty contest. It tests whether quality generalizes across products and contexts.

## 4. Why this is useful for India

India has a large and diverse ecosystem of local products, artisans, sellers, and regional brands. Many of these products do not resemble generic global catalog objects. Their value depends on details such as material, craft technique, construction, styling, and cultural context.

An image that is technically sharp but culturally inaccurate can still be unusable. For example, a saree may have the wrong drape, footwear may lose the recognizable Kolhapuri form, or a tiffin box may not show the expected stacked compartments. The India-fit criterion makes these failures visible instead of allowing visual polish alone to dominate the result.

This evaluation is useful because it treats local relevance as a first-class quality dimension. It asks not only whether an image looks good, but whether it looks like a credible representation of the Indian product described in the prompt.

## 5. Why it matters for AI labs building for India

AI labs building for India need evaluation data that reflects Indian users, products, languages, and contexts. Generic image-quality benchmarks may reward composition and sharpness while missing cultural or product-specific errors.

This type of evaluation can help labs:

- Identify category-specific weaknesses in generation systems.
- Separate visual quality from prompt adherence and cultural fit.
- Prioritize improvements that affect sellers and consumers in India.
- Compare models without exposing participants to model identities.
- Build evaluation sets that include regional products rather than only globally common objects.

The results can also guide model cards, safety and quality reviews, product decisions, and future fine-tuning data collection.

## 6. How the evaluation works

The survey has three stages:

### Consent and participant information

Participants provide their name, email, and age, confirm that they are at least 18, and consent to their information and responses being used for the assignment submission.

### Four rating screens

Participants see one prompt group at a time. Each screen includes the prompt text and four generated images labeled A, B, C, and D. For every image, the participant gives a 1-5 rating for:

- **Relevance:** How well the image matches what the prompt asked for.
- **Visual Quality:** How realistic, polished, and professionally usable the image looks.
- **India-fit:** How authentic the product and setting look for the Indian context.

The participant then selects one overall favorite. The same process is repeated for Bottle, Saree, Shoes, and Tiffin.

### Storage and analysis

Each completed survey is saved as one record with a timestamp, participant information, ratings, and favorite selections. The dashboard calculates overall favorite counts, average ratings per model and criterion, and category-level breakdowns.

## 7. How participants judged the outputs

Participants judged the outputs independently from the model identity. They saw only the neutral labels A-D. The three rating criteria were designed to capture complementary dimensions:

- Relevance measures instruction following.
- Visual Quality measures realism and professional presentation.
- India-fit measures cultural and product authenticity.

The overall-favorite choice adds a simple forced-preference signal. This is useful because two images may have similar average scores while one is still more compelling as a final choice.

## 8. Results found so far

### Pilot size

- Completed participants: **2**
- Prompt groups per participant: **4**
- Prompt-level preference decisions: **8**

### Overall favorite counts

| Model label | Favorite selections |
|---|---:|
| A | 3 |
| B | 1 |
| C | 4 |
| D | 0 |

Model C was the most selected overall favorite in this pilot, but the margin over A is small and the sample is not large enough to support a general claim.

### Category breakdown

| Prompt group | A | B | C | D | Pilot leader |
|---|---:|---:|---:|---:|---|
| Bottle | 1 | 0 | 1 | 0 | A and C tie |
| Saree | 0 | 0 | 2 | 0 | C |
| Shoes | 2 | 0 | 0 | 0 | A |
| Tiffin | 0 | 1 | 1 | 0 | B and C tie |

### Average ratings by category

Values below are averages across the two pilot participants, shown as Relevance / Visual Quality / India-fit.

| Prompt | A | B | C | D |
|---|---|---|---|---|
| Bottle | 3.50 / 3.00 / 4.00 | 3.00 / 4.00 / 2.50 | 3.00 / 3.50 / 3.50 | 4.00 / 3.00 / 3.00 |
| Saree | 3.50 / 3.00 / 4.00 | 2.50 / 2.00 / 2.00 | 4.50 / 4.00 / 3.50 | 1.50 / 3.00 / 2.00 |
| Shoes | 3.50 / 4.50 / 4.00 | 3.00 / 3.00 / 4.00 | 3.00 / 3.50 / 3.50 | 3.00 / 3.00 / 2.50 |
| Tiffin | 1.50 / 3.50 / 3.50 | 3.50 / 3.50 / 2.50 | 2.50 / 2.50 / 3.50 | 2.00 / 2.50 / 4.00 |

The most notable category-level signal is C's strong Saree result and A's strong Shoes result. The Tiffin ratings show a tradeoff: B was stronger on relevance and visual quality, while D had the strongest India-fit score but was not selected as a favorite. This illustrates why the evaluation keeps the criteria separate rather than relying on one total score.

### Limitations

The current findings are exploratory. Two participants cannot represent Indian users broadly, and the participants may share similar backgrounds or preferences. The study also does not yet measure inter-rater agreement, demographic differences, or statistical significance. Model labels are anonymized, but the four outputs may differ in ways that are visible to participants.

## 9. How I would scale the evaluation

I would scale the study in five ways:

1. **Increase the participant pool:** Recruit at least 30-50 participants for an initial stable comparison, then expand to several hundred for stronger conclusions.
2. **Improve participant diversity:** Include participants across regions, languages, ages, occupations, and levels of familiarity with the products.
3. **Expand the prompt set:** Add more products from food, clothing, home goods, handicrafts, beauty, and small-business catalog use cases. Include multiple prompts per category.
4. **Add evaluator controls:** Randomize image order, rotate model-letter assignments, and track completion time. This reduces position and label bias.
5. **Strengthen analysis:** Report confidence intervals, rating distributions, inter-rater agreement, category-specific error types, and qualitative comments. Add expert review for cultural authenticity where appropriate.

A future version could also include pairwise comparisons, image-specific error tags, multilingual prompts, and a blinded expert panel alongside general participants.

## Conclusion

This evaluation provides a compact way to test whether text-to-image systems can produce useful Indian product imagery. The pilot suggests that no single model label wins every category: C led overall and on Saree, A led on Shoes, and Bottle and Tiffin showed mixed preferences. The central takeaway is that evaluation for India should measure relevance, visual quality, and India-fit separately across multiple product categories. That structure produces more actionable evidence than a single generic image-quality score.
