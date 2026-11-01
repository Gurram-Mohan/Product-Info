/**
 * NutriScan Nutrition Database
 * All values are per 100 g of the specified product form.
 * Sources noted per product.
 *
 * Daily Reference Intakes (DRI) used for %DRI calculations:
 * Based on ICMR-NIN Recommended Dietary Allowances (RDA) for an average adult Indian,
 * supplemented by FSSAI Nutrition Labelling Guidelines and global Codex Alimentarius values.
 *
 * Energy:       2000 kcal  (Codex / FSSAI label reference)
 * Carbohydrate: 300 g      (Codex reference)
 * Protein:      50  g      (FSSAI label reference)
 * Fat:          65  g      (Codex reference)
 * Sat. Fat:     20  g      (FSSAI label reference)
 * Fibre:        25  g      (FSSAI / Codex)
 * Sugars:       50  g      (Codex reference)
 * Cholesterol:  300 mg     (standard reference)
 * Sodium:       2300 mg    (ICMR-NIN / WHO)
 *
 * Vitamins & Minerals - ICMR-NIN RDA 2020 (adult, mixed sex average):
 * Vitamin A:   600 µg RAE
 * Vitamin C:   40  mg
 * Vitamin D:   15  µg
 * Vitamin E:   10  mg
 * Vitamin K:   55  µg
 * Thiamine B1: 1.2 mg
 * Riboflavin B2:1.4 mg
 * Niacin B3:   16  mg
 * Vitamin B6:  1.6 mg
 * Folate B9:   200 µg
 * Vitamin B12: 1.0 µg
 * Calcium:     600 mg
 * Iron:        17  mg
 * Magnesium:   310 mg
 * Phosphorus:  700 mg
 * Potassium:   3500 mg
 * Zinc:        11  mg
 * Copper:      0.9 mg
 * Manganese:   2.3 mg
 * Selenium:    40  µg
 */

const DAILY_REFERENCE = {
  energy:         { value: 2000,  unit: 'kcal' },
  carbohydrate:   { value: 300,   unit: 'g' },
  protein:        { value: 50,    unit: 'g' },
  fat:            { value: 65,    unit: 'g' },
  saturatedFat:   { value: 20,    unit: 'g' },
  fibre:          { value: 25,    unit: 'g' },
  sugars:         { value: 50,    unit: 'g' },
  cholesterol:    { value: 300,   unit: 'mg' },
  sodium:         { value: 2300,  unit: 'mg' },
  vitaminA:       { value: 600,   unit: 'µg' },
  vitaminC:       { value: 40,    unit: 'mg' },
  vitaminD:       { value: 15,    unit: 'µg' },
  vitaminE:       { value: 10,    unit: 'mg' },
  vitaminK:       { value: 55,    unit: 'µg' },
  thiamine:       { value: 1.2,   unit: 'mg' },
  riboflavin:     { value: 1.4,   unit: 'mg' },
  niacin:         { value: 16,    unit: 'mg' },
  vitaminB6:      { value: 1.6,   unit: 'mg' },
  folate:         { value: 200,   unit: 'µg' },
  vitaminB12:     { value: 1.0,   unit: 'µg' },
  calcium:        { value: 600,   unit: 'mg' },
  iron:           { value: 17,    unit: 'mg' },
  magnesium:      { value: 310,   unit: 'mg' },
  phosphorus:     { value: 700,   unit: 'mg' },
  potassium:      { value: 3500,  unit: 'mg' },
  zinc:           { value: 11,    unit: 'mg' },
  copper:         { value: 0.9,   unit: 'mg' },
  manganese:      { value: 2.3,   unit: 'mg' },
  selenium:       { value: 40,    unit: 'µg' },
};

const PRODUCTS = [
  {
    id: 'instant-noodles',
    name: 'Instant Noodles',
    description: 'Dry packaged instant noodles (uncooked / as-sold)',
    note: 'Values represent the DRY (uncooked) packaged product including seasoning. Prepared product will have lower nutrient density per 100 g due to absorbed water. Source: USDA FoodData Central (Ramen noodles, dry) and representative Indian brand labels. Values are representative estimates.',
    image: 'images/instant_noodles.jpg',
    category: 'Processed / Packaged',
    nutrients: {
      energy:             { value: 436,    unit: 'kcal', dri: 'energy',       label: 'Energy' },
      carbohydrate:       { value: 63.0,   unit: 'g',    dri: 'carbohydrate', label: 'Total Carbohydrates' },
      addedSugars:        { value: 1.5,    unit: 'g',    dri: null,           label: 'Added Sugars' },
      totalSugars:        { value: 2.0,    unit: 'g',    dri: 'sugars',       label: 'Total Sugars' },
      protein:            { value: 9.0,    unit: 'g',    dri: 'protein',      label: 'Protein' },
      totalFat:           { value: 17.0,   unit: 'g',    dri: 'fat',          label: 'Total Fat' },
      saturatedFat:       { value: 7.5,    unit: 'g',    dri: 'saturatedFat', label: 'Saturated Fat' },
      mufa:               { value: 6.2,    unit: 'g',    dri: null,           label: 'Monounsaturated Fat' },
      pufa:               { value: 2.0,    unit: 'g',    dri: null,           label: 'Polyunsaturated Fat' },
      transFat:           { value: 0.3,    unit: 'g',    dri: null,           label: 'Trans Fat' },
      fibre:              { value: 2.5,    unit: 'g',    dri: 'fibre',        label: 'Dietary Fibre' },
      cholesterol:        { value: 0,      unit: 'mg',   dri: 'cholesterol',  label: 'Cholesterol' },
      sodium:             { value: 1820,   unit: 'mg',   dri: 'sodium',       label: 'Sodium' },
      vitaminA:           { value: null,   unit: 'µg',   dri: 'vitaminA',     label: 'Vitamin A' },
      vitaminC:           { value: 0,      unit: 'mg',   dri: 'vitaminC',     label: 'Vitamin C' },
      vitaminD:           { value: null,   unit: 'µg',   dri: 'vitaminD',     label: 'Vitamin D' },
      vitaminE:           { value: null,   unit: 'mg',   dri: 'vitaminE',     label: 'Vitamin E' },
      vitaminK:           { value: null,   unit: 'µg',   dri: 'vitaminK',     label: 'Vitamin K' },
      thiamine:           { value: 0.55,   unit: 'mg',   dri: 'thiamine',     label: 'Vitamin B1 / Thiamine' },
      riboflavin:         { value: 0.28,   unit: 'mg',   dri: 'riboflavin',   label: 'Vitamin B2 / Riboflavin' },
      niacin:             { value: 4.2,    unit: 'mg',   dri: 'niacin',       label: 'Vitamin B3 / Niacin' },
      vitaminB6:          { value: 0.10,   unit: 'mg',   dri: 'vitaminB6',    label: 'Vitamin B6' },
      folate:             { value: 15,     unit: 'µg',   dri: 'folate',       label: 'Vitamin B9 / Folate' },
      vitaminB12:         { value: null,   unit: 'µg',   dri: 'vitaminB12',   label: 'Vitamin B12' },
      calcium:            { value: 28,     unit: 'mg',   dri: 'calcium',      label: 'Calcium' },
      iron:               { value: 3.0,    unit: 'mg',   dri: 'iron',         label: 'Iron' },
      magnesium:          { value: 29,     unit: 'mg',   dri: 'magnesium',    label: 'Magnesium' },
      phosphorus:         { value: 127,    unit: 'mg',   dri: 'phosphorus',   label: 'Phosphorus' },
      potassium:          { value: 166,    unit: 'mg',   dri: 'potassium',    label: 'Potassium' },
      zinc:               { value: 1.0,    unit: 'mg',   dri: 'zinc',         label: 'Zinc' },
      copper:             { value: 0.14,   unit: 'mg',   dri: 'copper',       label: 'Copper' },
      manganese:          { value: 0.60,   unit: 'mg',   dri: 'manganese',    label: 'Manganese' },
      selenium:           { value: 22,     unit: 'µg',   dri: 'selenium',     label: 'Selenium' },
    }
  },
  {
    id: 'potato-chips',
    name: 'Potato Chips',
    description: 'Plain salted potato chips (as-sold, dry-snack)',
    note: 'Values represent plain salted potato chips (ready-to-eat packaged product). Source: USDA FoodData Central #11367 (Potato chips, plain, salted) and representative Indian label data. Values are representative estimates.',
    image: 'images/potato_chips.jpg',
    category: 'Processed / Packaged',
    nutrients: {
      energy:             { value: 536,    unit: 'kcal', dri: 'energy',       label: 'Energy' },
      carbohydrate:       { value: 52.9,   unit: 'g',    dri: 'carbohydrate', label: 'Total Carbohydrates' },
      addedSugars:        { value: 0.3,    unit: 'g',    dri: null,           label: 'Added Sugars' },
      totalSugars:        { value: 0.5,    unit: 'g',    dri: 'sugars',       label: 'Total Sugars' },
      protein:            { value: 7.0,    unit: 'g',    dri: 'protein',      label: 'Protein' },
      totalFat:           { value: 34.6,   unit: 'g',    dri: 'fat',          label: 'Total Fat' },
      saturatedFat:       { value: 3.4,    unit: 'g',    dri: 'saturatedFat', label: 'Saturated Fat' },
      mufa:               { value: 6.3,    unit: 'g',    dri: null,           label: 'Monounsaturated Fat' },
      pufa:               { value: 23.5,   unit: 'g',    dri: null,           label: 'Polyunsaturated Fat' },
      transFat:           { value: 0.1,    unit: 'g',    dri: null,           label: 'Trans Fat' },
      fibre:              { value: 4.8,    unit: 'g',    dri: 'fibre',        label: 'Dietary Fibre' },
      cholesterol:        { value: 0,      unit: 'mg',   dri: 'cholesterol',  label: 'Cholesterol' },
      sodium:             { value: 525,    unit: 'mg',   dri: 'sodium',       label: 'Sodium' },
      vitaminA:           { value: 3,      unit: 'µg',   dri: 'vitaminA',     label: 'Vitamin A' },
      vitaminC:           { value: 31.1,   unit: 'mg',   dri: 'vitaminC',     label: 'Vitamin C' },
      vitaminD:           { value: null,   unit: 'µg',   dri: 'vitaminD',     label: 'Vitamin D' },
      vitaminE:           { value: 3.1,    unit: 'mg',   dri: 'vitaminE',     label: 'Vitamin E' },
      vitaminK:           { value: 11.3,   unit: 'µg',   dri: 'vitaminK',     label: 'Vitamin K' },
      thiamine:           { value: 0.21,   unit: 'mg',   dri: 'thiamine',     label: 'Vitamin B1 / Thiamine' },
      riboflavin:         { value: 0.07,   unit: 'mg',   dri: 'riboflavin',   label: 'Vitamin B2 / Riboflavin' },
      niacin:             { value: 3.8,    unit: 'mg',   dri: 'niacin',       label: 'Vitamin B3 / Niacin' },
      vitaminB6:          { value: 0.42,   unit: 'mg',   dri: 'vitaminB6',    label: 'Vitamin B6' },
      folate:             { value: 27,     unit: 'µg',   dri: 'folate',       label: 'Vitamin B9 / Folate' },
      vitaminB12:         { value: null,   unit: 'µg',   dri: 'vitaminB12',   label: 'Vitamin B12' },
      calcium:            { value: 21,     unit: 'mg',   dri: 'calcium',      label: 'Calcium' },
      iron:               { value: 1.7,    unit: 'mg',   dri: 'iron',         label: 'Iron' },
      magnesium:          { value: 55,     unit: 'mg',   dri: 'magnesium',    label: 'Magnesium' },
      phosphorus:         { value: 188,    unit: 'mg',   dri: 'phosphorus',   label: 'Phosphorus' },
      potassium:          { value: 1642,   unit: 'mg',   dri: 'potassium',    label: 'Potassium' },
      zinc:               { value: 0.9,    unit: 'mg',   dri: 'zinc',         label: 'Zinc' },
      copper:             { value: 0.40,   unit: 'mg',   dri: 'copper',       label: 'Copper' },
      manganese:          { value: 0.53,   unit: 'mg',   dri: 'manganese',    label: 'Manganese' },
      selenium:           { value: 0.5,    unit: 'µg',   dri: 'selenium',     label: 'Selenium' },
    }
  },
  {
    id: 'biscuits',
    name: 'Biscuits',
    description: 'Plain sweet wheat biscuits (as-sold, packaged)',
    note: 'Values represent a generic plain sweet wheat biscuit (Marie/Digestive-type). Source: USDA FoodData Central #18022 and ICMR-NIN Indian food composition tables. Values are representative estimates; specific brands will differ.',
    image: 'images/biscuits.jpg',
    category: 'Processed / Packaged',
    nutrients: {
      energy:             { value: 443,    unit: 'kcal', dri: 'energy',       label: 'Energy' },
      carbohydrate:       { value: 70.0,   unit: 'g',    dri: 'carbohydrate', label: 'Total Carbohydrates' },
      addedSugars:        { value: 18.0,   unit: 'g',    dri: null,           label: 'Added Sugars' },
      totalSugars:        { value: 18.5,   unit: 'g',    dri: 'sugars',       label: 'Total Sugars' },
      protein:            { value: 7.5,    unit: 'g',    dri: 'protein',      label: 'Protein' },
      totalFat:           { value: 16.0,   unit: 'g',    dri: 'fat',          label: 'Total Fat' },
      saturatedFat:       { value: 7.0,    unit: 'g',    dri: 'saturatedFat', label: 'Saturated Fat' },
      mufa:               { value: 5.5,    unit: 'g',    dri: null,           label: 'Monounsaturated Fat' },
      pufa:               { value: 2.5,    unit: 'g',    dri: null,           label: 'Polyunsaturated Fat' },
      transFat:           { value: 0.5,    unit: 'g',    dri: null,           label: 'Trans Fat' },
      fibre:              { value: 2.0,    unit: 'g',    dri: 'fibre',        label: 'Dietary Fibre' },
      cholesterol:        { value: 15,     unit: 'mg',   dri: 'cholesterol',  label: 'Cholesterol' },
      sodium:             { value: 420,    unit: 'mg',   dri: 'sodium',       label: 'Sodium' },
      vitaminA:           { value: null,   unit: 'µg',   dri: 'vitaminA',     label: 'Vitamin A' },
      vitaminC:           { value: 0,      unit: 'mg',   dri: 'vitaminC',     label: 'Vitamin C' },
      vitaminD:           { value: null,   unit: 'µg',   dri: 'vitaminD',     label: 'Vitamin D' },
      vitaminE:           { value: 1.5,    unit: 'mg',   dri: 'vitaminE',     label: 'Vitamin E' },
      vitaminK:           { value: 20.0,   unit: 'µg',   dri: 'vitaminK',     label: 'Vitamin K' },
      thiamine:           { value: 0.35,   unit: 'mg',   dri: 'thiamine',     label: 'Vitamin B1 / Thiamine' },
      riboflavin:         { value: 0.20,   unit: 'mg',   dri: 'riboflavin',   label: 'Vitamin B2 / Riboflavin' },
      niacin:             { value: 3.5,    unit: 'mg',   dri: 'niacin',       label: 'Vitamin B3 / Niacin' },
      vitaminB6:          { value: 0.07,   unit: 'mg',   dri: 'vitaminB6',    label: 'Vitamin B6' },
      folate:             { value: 22,     unit: 'µg',   dri: 'folate',       label: 'Vitamin B9 / Folate' },
      vitaminB12:         { value: null,   unit: 'µg',   dri: 'vitaminB12',   label: 'Vitamin B12' },
      calcium:            { value: 42,     unit: 'mg',   dri: 'calcium',      label: 'Calcium' },
      iron:               { value: 3.0,    unit: 'mg',   dri: 'iron',         label: 'Iron' },
      magnesium:          { value: 20,     unit: 'mg',   dri: 'magnesium',    label: 'Magnesium' },
      phosphorus:         { value: 110,    unit: 'mg',   dri: 'phosphorus',   label: 'Phosphorus' },
      potassium:          { value: 120,    unit: 'mg',   dri: 'potassium',    label: 'Potassium' },
      zinc:               { value: 0.6,    unit: 'mg',   dri: 'zinc',         label: 'Zinc' },
      copper:             { value: 0.12,   unit: 'mg',   dri: 'copper',       label: 'Copper' },
      manganese:          { value: 0.65,   unit: 'mg',   dri: 'manganese',    label: 'Manganese' },
      selenium:           { value: 8.0,    unit: 'µg',   dri: 'selenium',     label: 'Selenium' },
    }
  },
  {
    id: 'roasted-makhana',
    name: 'Roasted Makhana',
    description: 'Plain roasted makhana / fox nuts (dry-roasted, no added oil or seasoning)',
    note: 'Values represent PLAIN dry-roasted makhana (Euryale ferox) without added oil or seasoning. Oil-roasted or seasoned variants will have higher fat and sodium content. Source: ICMR-NIN Indian Food Composition Tables 2017 and peer-reviewed literature on Euryale ferox. Values are representative estimates.',
    image: 'images/roasted_makhana.jpg',
    category: 'Natural / Minimally Processed',
    nutrients: {
      energy:             { value: 362,    unit: 'kcal', dri: 'energy',       label: 'Energy' },
      carbohydrate:       { value: 76.9,   unit: 'g',    dri: 'carbohydrate', label: 'Total Carbohydrates' },
      addedSugars:        { value: 0,      unit: 'g',    dri: null,           label: 'Added Sugars' },
      totalSugars:        { value: 0.0,    unit: 'g',    dri: 'sugars',       label: 'Total Sugars' },
      protein:            { value: 9.7,    unit: 'g',    dri: 'protein',      label: 'Protein' },
      totalFat:           { value: 0.1,    unit: 'g',    dri: 'fat',          label: 'Total Fat' },
      saturatedFat:       { value: 0.0,    unit: 'g',    dri: 'saturatedFat', label: 'Saturated Fat' },
      mufa:               { value: null,   unit: 'g',    dri: null,           label: 'Monounsaturated Fat' },
      pufa:               { value: null,   unit: 'g',    dri: null,           label: 'Polyunsaturated Fat' },
      transFat:           { value: 0.0,    unit: 'g',    dri: null,           label: 'Trans Fat' },
      fibre:              { value: 14.5,   unit: 'g',    dri: 'fibre',        label: 'Dietary Fibre' },
      cholesterol:        { value: 0,      unit: 'mg',   dri: 'cholesterol',  label: 'Cholesterol' },
      sodium:             { value: 5,      unit: 'mg',   dri: 'sodium',       label: 'Sodium' },
      vitaminA:           { value: null,   unit: 'µg',   dri: 'vitaminA',     label: 'Vitamin A' },
      vitaminC:           { value: null,   unit: 'mg',   dri: 'vitaminC',     label: 'Vitamin C' },
      vitaminD:           { value: null,   unit: 'µg',   dri: 'vitaminD',     label: 'Vitamin D' },
      vitaminE:           { value: null,   unit: 'mg',   dri: 'vitaminE',     label: 'Vitamin E' },
      vitaminK:           { value: null,   unit: 'µg',   dri: 'vitaminK',     label: 'Vitamin K' },
      thiamine:           { value: 0.20,   unit: 'mg',   dri: 'thiamine',     label: 'Vitamin B1 / Thiamine' },
      riboflavin:         { value: 0.07,   unit: 'mg',   dri: 'riboflavin',   label: 'Vitamin B2 / Riboflavin' },
      niacin:             { value: 0.8,    unit: 'mg',   dri: 'niacin',       label: 'Vitamin B3 / Niacin' },
      vitaminB6:          { value: null,   unit: 'mg',   dri: 'vitaminB6',    label: 'Vitamin B6' },
      folate:             { value: null,   unit: 'µg',   dri: 'folate',       label: 'Vitamin B9 / Folate' },
      vitaminB12:         { value: null,   unit: 'µg',   dri: 'vitaminB12',   label: 'Vitamin B12' },
      calcium:            { value: 60,     unit: 'mg',   dri: 'calcium',      label: 'Calcium' },
      iron:               { value: 1.4,    unit: 'mg',   dri: 'iron',         label: 'Iron' },
      magnesium:          { value: 67,     unit: 'mg',   dri: 'magnesium',    label: 'Magnesium' },
      phosphorus:         { value: 200,    unit: 'mg',   dri: 'phosphorus',   label: 'Phosphorus' },
      potassium:          { value: 500,    unit: 'mg',   dri: 'potassium',    label: 'Potassium' },
      zinc:               { value: 0.6,    unit: 'mg',   dri: 'zinc',         label: 'Zinc' },
      copper:             { value: 0.18,   unit: 'mg',   dri: 'copper',       label: 'Copper' },
      manganese:          { value: null,   unit: 'mg',   dri: 'manganese',    label: 'Manganese' },
      selenium:           { value: null,   unit: 'µg',   dri: 'selenium',     label: 'Selenium' },
    }
  },
  {
    id: 'ice-cream',
    name: 'Ice-cream',
    description: 'Vanilla flavoured ice-cream (regular / full-fat)',
    note: 'Values represent a generic full-fat vanilla ice cream. Source: USDA FoodData Central #19086 (Ice creams, vanilla, regular) and ICMR-NIN Indian Food Composition Tables. Nutritional content varies significantly with flavour, fat content, and brand.',
    image: 'images/ice_cream.jpg',
    category: 'Dairy-based / Frozen Dessert',
    nutrients: {
      energy:             { value: 207,    unit: 'kcal', dri: 'energy',       label: 'Energy' },
      carbohydrate:       { value: 23.6,   unit: 'g',    dri: 'carbohydrate', label: 'Total Carbohydrates' },
      addedSugars:        { value: 19.0,   unit: 'g',    dri: null,           label: 'Added Sugars' },
      totalSugars:        { value: 21.2,   unit: 'g',    dri: 'sugars',       label: 'Total Sugars' },
      protein:            { value: 3.5,    unit: 'g',    dri: 'protein',      label: 'Protein' },
      totalFat:           { value: 11.0,   unit: 'g',    dri: 'fat',          label: 'Total Fat' },
      saturatedFat:       { value: 6.8,    unit: 'g',    dri: 'saturatedFat', label: 'Saturated Fat' },
      mufa:               { value: 3.0,    unit: 'g',    dri: null,           label: 'Monounsaturated Fat' },
      pufa:               { value: 0.5,    unit: 'g',    dri: null,           label: 'Polyunsaturated Fat' },
      transFat:           { value: 0.2,    unit: 'g',    dri: null,           label: 'Trans Fat' },
      fibre:              { value: 0.0,    unit: 'g',    dri: 'fibre',        label: 'Dietary Fibre' },
      cholesterol:        { value: 44,     unit: 'mg',   dri: 'cholesterol',  label: 'Cholesterol' },
      sodium:             { value: 80,     unit: 'mg',   dri: 'sodium',       label: 'Sodium' },
      vitaminA:           { value: 87,     unit: 'µg',   dri: 'vitaminA',     label: 'Vitamin A' },
      vitaminC:           { value: 0.6,    unit: 'mg',   dri: 'vitaminC',     label: 'Vitamin C' },
      vitaminD:           { value: 0.1,    unit: 'µg',   dri: 'vitaminD',     label: 'Vitamin D' },
      vitaminE:           { value: 0.3,    unit: 'mg',   dri: 'vitaminE',     label: 'Vitamin E' },
      vitaminK:           { value: 0.3,    unit: 'µg',   dri: 'vitaminK',     label: 'Vitamin K' },
      thiamine:           { value: 0.04,   unit: 'mg',   dri: 'thiamine',     label: 'Vitamin B1 / Thiamine' },
      riboflavin:         { value: 0.18,   unit: 'mg',   dri: 'riboflavin',   label: 'Vitamin B2 / Riboflavin' },
      niacin:             { value: 0.10,   unit: 'mg',   dri: 'niacin',       label: 'Vitamin B3 / Niacin' },
      vitaminB6:          { value: 0.05,   unit: 'mg',   dri: 'vitaminB6',    label: 'Vitamin B6' },
      folate:             { value: 5,      unit: 'µg',   dri: 'folate',       label: 'Vitamin B9 / Folate' },
      vitaminB12:         { value: 0.31,   unit: 'µg',   dri: 'vitaminB12',   label: 'Vitamin B12' },
      calcium:            { value: 128,    unit: 'mg',   dri: 'calcium',      label: 'Calcium' },
      iron:               { value: 0.1,    unit: 'mg',   dri: 'iron',         label: 'Iron' },
      magnesium:          { value: 14,     unit: 'mg',   dri: 'magnesium',    label: 'Magnesium' },
      phosphorus:         { value: 105,    unit: 'mg',   dri: 'phosphorus',   label: 'Phosphorus' },
      potassium:          { value: 199,    unit: 'mg',   dri: 'potassium',    label: 'Potassium' },
      zinc:               { value: 0.45,   unit: 'mg',   dri: 'zinc',         label: 'Zinc' },
      copper:             { value: 0.02,   unit: 'mg',   dri: 'copper',       label: 'Copper' },
      manganese:          { value: 0.02,   unit: 'mg',   dri: 'manganese',    label: 'Manganese' },
      selenium:           { value: 1.8,    unit: 'µg',   dri: 'selenium',     label: 'Selenium' },
    }
  }
];

const MACRONUTRIENT_KEYS = [
  'energy', 'carbohydrate', 'totalSugars', 'addedSugars',
  'protein', 'totalFat', 'saturatedFat', 'mufa', 'pufa', 'transFat',
  'fibre', 'cholesterol', 'sodium'
];

const VITAMIN_KEYS = [
  'vitaminA', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminK',
  'thiamine', 'riboflavin', 'niacin', 'vitaminB6', 'folate', 'vitaminB12'
];

const MINERAL_KEYS = [
  'calcium', 'iron', 'magnesium', 'phosphorus', 'potassium',
  'zinc', 'copper', 'manganese', 'selenium'
];
