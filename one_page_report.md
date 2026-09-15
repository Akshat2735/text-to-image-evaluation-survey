# One-Page Report: Text-to-Image Evaluation for Indian Product Imagery

## Eval

This project evaluates text-to-image outputs for Indian e-commerce product photography. The categories are copper water bottles, Kanjeevaram silk sarees, Kolhapuri leather chappals, and stainless-steel Indian tiffin boxes. These categories were chosen because they combine practical catalog needs with product and cultural details that generic image benchmarks may miss.

## Core setup

Participants saw four images per prompt, labeled only A, B, C, and D so the underlying model identity was hidden. For every image, they rated:

- **Relevance:** Does it match the prompt?
- **Visual Quality:** Does it look realistic and professional?
- **India-fit:** Does it look authentic to the Indian product or context?

Each rating used a 1-5 star scale. Participants also selected one overall favorite for each category. The survey stores each participant's ratings and choices and provides a dashboard with overall and category-level summaries.

## Main findings so far

The pilot includes **2 participants** and **8 prompt-level favorite choices**:

| Model label | Favorite selections |
|---|---:|
| A | 3 |
| B | 1 |
| C | 4 |
| D | 0 |

C was the most selected overall, but the category results were mixed:

- **Bottle:** A and C tied, with one favorite each.
- **Saree:** C won both participant choices.
- **Shoes:** A won both participant choices.
- **Tiffin:** B and C tied, with one favorite each.

The results suggest category-dependent strengths rather than one universal winner. C performed especially well for Saree, while A performed especially well for Shoes. In Tiffin, B had stronger relevance and visual-quality averages, while D had the strongest India-fit average but was not selected as a favorite.

## Most important takeaway

For AI systems serving India, image quality should not be measured by visual polish alone. A useful evaluation must separate prompt relevance, professional visual quality, and India-fit, and it must test several locally meaningful product categories. The pilot is too small for broad conclusions, but it already shows why category-specific evaluation is important: the preferred output changes with the product.

## Next scale

The next version should recruit at least 30-50 participants with varied regional and demographic backgrounds, expand to more Indian product categories, randomize image order and letter assignments, and report rating distributions, confidence intervals, inter-rater agreement, and qualitative error tags. This would turn the pilot into a more reliable benchmark for models and products built for Indian users.
