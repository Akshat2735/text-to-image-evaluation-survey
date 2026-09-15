# Text-to-Image Evaluation Survey: India-Relevant Product Imagery

> **SIMULATED EXAMPLE DATA:** This document uses invented aggregate results for 15 hypothetical participants. It is not evidence collected from real participants and must not be submitted as actual study findings.

## Executive summary

This project evaluates how well text-to-image systems generate product imagery for Indian products and contexts. I selected four everyday product categories: copper water bottles, Kanjeevaram silk sarees, Kolhapuri leather chappals, and stainless-steel Indian tiffin boxes. Participants compared four anonymized image outputs per prompt and rated each output on relevance, visual quality, and India-fit, then selected an overall favorite.

For this simulated example, 15 hypothetical participants produced 60 prompt-level favorite choices. Model C received 22 favorite selections, A received 18, B received 12, and D received 8. The simulated pattern suggests category-dependent strengths: C leads for Saree and Tiffin, A leads for Shoes, and Bottle is led narrowly by C.

## 1. What evaluation I chose

I chose a human preference evaluation of text-to-image outputs for Indian product photography. The evaluation combines per-image 1-5 ratings for Relevance, Visual Quality, and India-fit with one forced overall-favorite choice from A, B, C, or D. The image labels are neutral letters so the underlying model identity is hidden from participants.

## 2. Category and use case

The category is Indian product imagery for e-commerce and catalog-style use. The four use cases are a copper water bottle with brass cap, a Kanjeevaram silk saree on a wooden mannequin, Kolhapuri leather chappals on a jute mat, and a stainless-steel Indian tiffin box with three compartments.

These products were selected because they represent common Indian commerce contexts while testing different visual challenges: metal and shape, textile and cultural styling, recognizable footwear, and structured kitchenware.

## 3. Why I chose this evaluation

Product imagery tests more than whether an image is attractive. It tests whether the system follows the prompt, produces a professional result, and preserves details that make an Indian product recognizable. Testing multiple categories also reveals whether a model's strengths generalize or change by product type.

## 4. Why this is useful for India

Indian products often depend on regional materials, craft traditions, construction details, and styling. A technically polished image can still be inaccurate if it shows the wrong textile treatment, footwear shape, product structure, or cultural context. The India-fit criterion makes this failure visible instead of allowing visual polish alone to dominate.

This is useful for Indian sellers, marketplaces, artisans, and small businesses that need credible catalog imagery without access to a professional photo studio.

## 5. Why it matters for AI labs building for India

Generic image-quality benchmarks may reward sharpness and composition while missing errors in local products and contexts. This evaluation helps AI labs identify category-specific weaknesses, compare prompt adherence with cultural fit, and prioritize improvements for Indian users. It can support benchmark design, model evaluation, product decisions, and future data collection.

## 6. How the evaluation works

Participants first provided consent and basic information, including confirmation that they were at least 18. They then saw four prompt screens. Each screen showed the prompt and four generated images labeled A, B, C, and D.

For every image, participants gave 1-5 ratings for Relevance, Visual Quality, and India-fit. They also selected one overall favorite. Each completed survey was stored with a timestamp and summarized by overall favorite count, average ratings, and prompt-group breakdown.

## 7. How participants judged the outputs

Participants judged images without seeing the underlying model identity. Relevance measured instruction following, Visual Quality measured realism and professional presentation, and India-fit measured authenticity to the Indian product or context. The forced favorite captured the image they would choose overall, even when criterion scores were mixed.

## 8. Simulated results for 15 hypothetical participants

### Sample size

- Hypothetical participants: **15**
- Prompt groups per participant: **4**
- Simulated prompt-level choices: **60**

### Overall favorite counts

| Model label | Simulated favorite selections |
|---|---:|
| A | 18 |
| B | 12 |
| C | 22 |
| D | 8 |

### Simulated category breakdown

| Prompt group | A | B | C | D | Simulated leader |
|---|---:|---:|---:|---:|---|
| Bottle | 5 | 3 | 6 | 1 | C |
| Saree | 3 | 2 | 8 | 2 | C |
| Shoes | 6 | 4 | 2 | 3 | A |
| Tiffin | 4 | 3 | 6 | 2 | C |
| **Total** | **18** | **12** | **22** | **8** | **C** |

### Simulated average ratings

Each value is Relevance / Visual Quality / India-fit, averaged over the 15 hypothetical participants.

| Prompt | A | B | C | D |
|---|---|---|---|---|
| Bottle | 3.9 / 3.8 / 3.7 | 3.5 / 3.6 / 3.3 | 4.2 / 4.1 / 4.0 | 3.1 / 3.2 / 3.0 |
| Saree | 3.6 / 3.5 / 3.8 | 3.2 / 3.1 / 3.0 | 4.4 / 4.3 / 4.5 | 3.0 / 3.2 / 3.1 |
| Shoes | 4.1 / 4.3 / 4.2 | 3.8 / 3.7 / 3.9 | 3.4 / 3.5 / 3.4 | 3.3 / 3.2 / 3.1 |
| Tiffin | 3.7 / 3.8 / 3.9 | 3.6 / 3.7 / 3.5 | 4.1 / 4.0 / 4.2 | 3.2 / 3.3 / 3.4 |

The simulated pattern suggests C is strongest across culturally specific categories, especially Saree and Tiffin, while A is strongest for Shoes. The results also show why the three criteria should remain separate: an image can be highly relevant but less India-fit, or visually polished without being the preferred output.

## 9. Limitations and scale-up

These numbers are invented for illustration and cannot support a real conclusion. A real study should recruit 30-50 participants for an initial comparison and more for stronger conclusions. Participants should vary by region, language, age, occupation, and familiarity with the products.

A larger evaluation should add more categories and prompts, randomize image order and letter assignments, track completion time, collect qualitative error tags, and report rating distributions, confidence intervals, and inter-rater agreement. Expert review could complement general participant judgments for cultural authenticity.

## Conclusion

The simulated example illustrates the intended analysis: no single score is sufficient, and category-specific performance matters. For AI systems serving India, evaluation should separately measure prompt relevance, visual quality, and India-fit across locally meaningful products. The findings in this document are hypothetical and must be replaced with actual collected responses before submission as research evidence.
