'use client'

import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import parseResults from './parse_results';

export default function FileUpload() {
  // Router here for redirecting to results page
  const router = useRouter()

  // Store file in page state for upload
  const [file, setFile] = useState<File>();

  // Handle form submission and submit to API
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    // FoodVisor query
    const formData = new FormData();
    formData.append('file', file);

    // Testing with sample API output for now, uncomment axios.post when ready
    try {
      sessionStorage.setItem("foodsFound", JSON.stringify({
        "analysis_id": "4889784c-a0c1-40e8-8c2a-dd9b15579446",
        "items": [
            {
                "food": [
                    {
                        "confidence": 0.9705,
                        "food_info": {
                            "display_name": "Falafel",
                            "food_id": "635b06ecddf52352aff9fd489ec40203",
                            "fv_grade": "D",
                            "g_per_serving": 100,
                            "nutrition": {
                                "alcohol_100g": 0,
                                "calcium_100g": 0.054,
                                "calories_100g": 342,
                                "carbs_100g": 32,
                                "chloride_100g": null,
                                "cholesterol_100g": 0,
                                "copper_100g": null,
                                "fat_100g": 18,
                                "fibers_100g": 7,
                                "glycemic_index": 55,
                                "insat_fat_100g": 14.2,
                                "iodine_100g": null,
                                "iron_100g": 0.0034,
                                "magnesium_100g": 0.082,
                                "manganese_100g": null,
                                "mono_fat_100g": 10,
                                "omega_3_100g": 0,
                                "omega_6_100g": 0,
                                "phosphorus_100g": 0,
                                "poly_fat_100g": 4.2,
                                "polyols_100g": null,
                                "potassium_100g": 0.585,
                                "proteins_100g": 13,
                                "salt_100g": null,
                                "sat_fat_100g": 2.4,
                                "selenium_100g": null,
                                "sodium_100g": 0.294,
                                "sugars_100g": 0,
                                "veg_percent": 0,
                                "vitamin_a_beta_k_100g": null,
                                "vitamin_a_retinol_100g": null,
                                "vitamin_b12_100g": null,
                                "vitamin_b1_100g": null,
                                "vitamin_b2_100g": null,
                                "vitamin_b3_100g": null,
                                "vitamin_b5_100g": null,
                                "vitamin_b6_100g": null,
                                "vitamin_b9_100g": 0,
                                "vitamin_c_100g": 0.0016,
                                "vitamin_d_100g": null,
                                "vitamin_e_100g": null,
                                "vitamin_k1_100g": null,
                                "water_100g": null,
                                "zinc_100g": null
                            }
                        },
                        "ingredients": [],
                        "quantity": 100
                    },
                    {
                        "confidence": 0.0182,
                        "food_info": {
                            "display_name": "Chicken meatballs",
                            "food_id": "e212f82e9a63816d604d0b9da2344226",
                            "fv_grade": "C",
                            "g_per_serving": 40,
                            "nutrition": {
                                "alcohol_100g": 0,
                                "calcium_100g": 0,
                                "calories_100g": 161,
                                "carbs_100g": 6.9,
                                "chloride_100g": null,
                                "cholesterol_100g": 0.082,
                                "copper_100g": null,
                                "fat_100g": 5.6,
                                "fibers_100g": 0.5,
                                "glycemic_index": 0,
                                "insat_fat_100g": 2.526,
                                "iodine_100g": null,
                                "iron_100g": 0,
                                "magnesium_100g": 0,
                                "manganese_100g": null,
                                "mono_fat_100g": 1.263,
                                "omega_3_100g": 0,
                                "omega_6_100g": 0,
                                "phosphorus_100g": 0,
                                "poly_fat_100g": 1.263,
                                "polyols_100g": null,
                                "potassium_100g": 0.199,
                                "proteins_100g": 19.4,
                                "salt_100g": null,
                                "sat_fat_100g": 1.608,
                                "selenium_100g": null,
                                "sodium_100g": 0.442,
                                "sugars_100g": 1.45,
                                "veg_percent": 0,
                                "vitamin_a_beta_k_100g": null,
                                "vitamin_a_retinol_100g": null,
                                "vitamin_b12_100g": null,
                                "vitamin_b1_100g": null,
                                "vitamin_b2_100g": null,
                                "vitamin_b3_100g": null,
                                "vitamin_b5_100g": null,
                                "vitamin_b6_100g": null,
                                "vitamin_b9_100g": 0,
                                "vitamin_c_100g": 0,
                                "vitamin_d_100g": null,
                                "vitamin_e_100g": null,
                                "vitamin_k1_100g": null,
                                "water_100g": null,
                                "zinc_100g": null
                            }
                        },
                        "ingredients": [],
                        "quantity": 40
                    },
                    {
                        "confidence": 0.0073,
                        "food_info": {
                            "display_name": "Zucchini flan",
                            "food_id": "b8c2eeb2e8567a87daa8d7367972eb93",
                            "fv_grade": "B",
                            "g_per_serving": 80,
                            "nutrition": {
                                "alcohol_100g": 0,
                                "calcium_100g": 0.0271,
                                "calories_100g": 107,
                                "carbs_100g": 4.28,
                                "chloride_100g": null,
                                "cholesterol_100g": 0.0308,
                                "copper_100g": null,
                                "fat_100g": 7.83,
                                "fibers_100g": 1.31,
                                "glycemic_index": 15,
                                "insat_fat_100g": 3.72,
                                "iodine_100g": null,
                                "iron_100g": 0.00056,
                                "magnesium_100g": 0.0141,
                                "manganese_100g": null,
                                "mono_fat_100g": 2.7,
                                "omega_3_100g": 0.042717,
                                "omega_6_100g": 0.855,
                                "phosphorus_100g": 0.0776,
                                "poly_fat_100g": 1.02,
                                "polyols_100g": null,
                                "potassium_100g": 0.184,
                                "proteins_100g": 4.32,
                                "salt_100g": null,
                                "sat_fat_100g": 1.71,
                                "selenium_100g": null,
                                "sodium_100g": 0.319,
                                "sugars_100g": 2.49,
                                "veg_percent": 0,
                                "vitamin_a_beta_k_100g": null,
                                "vitamin_a_retinol_100g": null,
                                "vitamin_b12_100g": null,
                                "vitamin_b1_100g": null,
                                "vitamin_b2_100g": null,
                                "vitamin_b3_100g": null,
                                "vitamin_b5_100g": null,
                                "vitamin_b6_100g": null,
                                "vitamin_b9_100g": 0.0000212,
                                "vitamin_c_100g": 0.00486,
                                "vitamin_d_100g": null,
                                "vitamin_e_100g": null,
                                "vitamin_k1_100g": null,
                                "water_100g": null,
                                "zinc_100g": null
                            }
                        },
                        "ingredients": [],
                        "quantity": 80
                    },
                    {
                        "confidence": 0.0004,
                        "food_info": {
                            "display_name": "Beef Meatballs",
                            "food_id": "16e8d55e29f5937ec0d39c4608ebbc1f",
                            "fv_grade": "B",
                            "g_per_serving": 40,
                            "nutrition": {
                                "alcohol_100g": 0,
                                "calcium_100g": 0.029,
                                "calories_100g": 202,
                                "carbs_100g": 5.1,
                                "chloride_100g": null,
                                "cholesterol_100g": 0.037,
                                "copper_100g": null,
                                "fat_100g": 13.3,
                                "fibers_100g": 0.6,
                                "glycemic_index": 0,
                                "insat_fat_100g": 5.566,
                                "iodine_100g": null,
                                "iron_100g": 0.0022,
                                "magnesium_100g": 0.0269,
                                "manganese_100g": null,
                                "mono_fat_100g": 4.95,
                                "omega_3_100g": 0.04577,
                                "omega_6_100g": 0.2613,
                                "phosphorus_100g": 0.172,
                                "poly_fat_100g": 0.616,
                                "polyols_100g": null,
                                "potassium_100g": 0.326,
                                "proteins_100g": 15.2,
                                "salt_100g": null,
                                "sat_fat_100g": 4.88,
                                "selenium_100g": null,
                                "sodium_100g": 0.452,
                                "sugars_100g": 0.944,
                                "veg_percent": 0,
                                "vitamin_a_beta_k_100g": null,
                                "vitamin_a_retinol_100g": null,
                                "vitamin_b12_100g": null,
                                "vitamin_b1_100g": null,
                                "vitamin_b2_100g": null,
                                "vitamin_b3_100g": null,
                                "vitamin_b5_100g": null,
                                "vitamin_b6_100g": null,
                                "vitamin_b9_100g": 0.0000258,
                                "vitamin_c_100g": 0.00694,
                                "vitamin_d_100g": null,
                                "vitamin_e_100g": null,
                                "vitamin_k1_100g": null,
                                "water_100g": null,
                                "zinc_100g": null
                            }
                        },
                        "ingredients": [],
                        "quantity": 40
                    },
                    {
                        "confidence": 0.0001,
                        "food_info": {
                            "display_name": "Vegetable patties",
                            "food_id": "9897663ab892fd3ed5d214b98166f560",
                            "fv_grade": "C",
                            "g_per_serving": 80,
                            "nutrition": {
                                "alcohol_100g": 0,
                                "calcium_100g": 0,
                                "calories_100g": 93.7,
                                "carbs_100g": 6.6,
                                "chloride_100g": null,
                                "cholesterol_100g": 0,
                                "copper_100g": null,
                                "fat_100g": 5.4,
                                "fibers_100g": 2.6,
                                "glycemic_index": 50,
                                "insat_fat_100g": 0,
                                "iodine_100g": null,
                                "iron_100g": 0,
                                "magnesium_100g": 0,
                                "manganese_100g": null,
                                "mono_fat_100g": 0,
                                "omega_3_100g": 0,
                                "omega_6_100g": 0,
                                "phosphorus_100g": 0,
                                "poly_fat_100g": 0,
                                "polyols_100g": null,
                                "potassium_100g": 0,
                                "proteins_100g": 3.3,
                                "salt_100g": null,
                                "sat_fat_100g": 0,
                                "selenium_100g": null,
                                "sodium_100g": 0,
                                "sugars_100g": 0,
                                "veg_percent": 0,
                                "vitamin_a_beta_k_100g": null,
                                "vitamin_a_retinol_100g": null,
                                "vitamin_b12_100g": null,
                                "vitamin_b1_100g": null,
                                "vitamin_b2_100g": null,
                                "vitamin_b3_100g": null,
                                "vitamin_b5_100g": null,
                                "vitamin_b6_100g": null,
                                "vitamin_b9_100g": 0,
                                "vitamin_c_100g": 0,
                                "vitamin_d_100g": null,
                                "vitamin_e_100g": null,
                                "vitamin_k1_100g": null,
                                "water_100g": null,
                                "zinc_100g": null
                            }
                        },
                        "ingredients": [],
                        "quantity": 80
                    }
                ],
                "position": {
                    "height": 0.6631,
                    "width": 0.661,
                    "x": 0.1663,
                    "y": 0.2596
                }
            },
            {
              "food": [
                  {
                      "confidence": 0.9705,
                      "food_info": {
                          "display_name": "Falafel",
                          "food_id": "635b06ecddf52352aff9fd489ec40203",
                          "fv_grade": "D",
                          "g_per_serving": 100,
                          "nutrition": {
                              "alcohol_100g": 0,
                              "calcium_100g": 0.054,
                              "calories_100g": 342,
                              "carbs_100g": 32,
                              "chloride_100g": null,
                              "cholesterol_100g": 0,
                              "copper_100g": null,
                              "fat_100g": 18,
                              "fibers_100g": 7,
                              "glycemic_index": 55,
                              "insat_fat_100g": 14.2,
                              "iodine_100g": null,
                              "iron_100g": 0.0034,
                              "magnesium_100g": 0.082,
                              "manganese_100g": null,
                              "mono_fat_100g": 10,
                              "omega_3_100g": 0,
                              "omega_6_100g": 0,
                              "phosphorus_100g": 0,
                              "poly_fat_100g": 4.2,
                              "polyols_100g": null,
                              "potassium_100g": 0.585,
                              "proteins_100g": 13,
                              "salt_100g": null,
                              "sat_fat_100g": 2.4,
                              "selenium_100g": null,
                              "sodium_100g": 0.294,
                              "sugars_100g": 0,
                              "veg_percent": 0,
                              "vitamin_a_beta_k_100g": null,
                              "vitamin_a_retinol_100g": null,
                              "vitamin_b12_100g": null,
                              "vitamin_b1_100g": null,
                              "vitamin_b2_100g": null,
                              "vitamin_b3_100g": null,
                              "vitamin_b5_100g": null,
                              "vitamin_b6_100g": null,
                              "vitamin_b9_100g": 0,
                              "vitamin_c_100g": 0.0016,
                              "vitamin_d_100g": null,
                              "vitamin_e_100g": null,
                              "vitamin_k1_100g": null,
                              "water_100g": null,
                              "zinc_100g": null
                          }
                      },
                      "ingredients": [],
                      "quantity": 100
                  },
                  {
                      "confidence": 0.0182,
                      "food_info": {
                          "display_name": "Chicken meatballs",
                          "food_id": "e212f82e9a63816d604d0b9da2344226",
                          "fv_grade": "C",
                          "g_per_serving": 40,
                          "nutrition": {
                              "alcohol_100g": 0,
                              "calcium_100g": 0,
                              "calories_100g": 161,
                              "carbs_100g": 6.9,
                              "chloride_100g": null,
                              "cholesterol_100g": 0.082,
                              "copper_100g": null,
                              "fat_100g": 5.6,
                              "fibers_100g": 0.5,
                              "glycemic_index": 0,
                              "insat_fat_100g": 2.526,
                              "iodine_100g": null,
                              "iron_100g": 0,
                              "magnesium_100g": 0,
                              "manganese_100g": null,
                              "mono_fat_100g": 1.263,
                              "omega_3_100g": 0,
                              "omega_6_100g": 0,
                              "phosphorus_100g": 0,
                              "poly_fat_100g": 1.263,
                              "polyols_100g": null,
                              "potassium_100g": 0.199,
                              "proteins_100g": 19.4,
                              "salt_100g": null,
                              "sat_fat_100g": 1.608,
                              "selenium_100g": null,
                              "sodium_100g": 0.442,
                              "sugars_100g": 1.45,
                              "veg_percent": 0,
                              "vitamin_a_beta_k_100g": null,
                              "vitamin_a_retinol_100g": null,
                              "vitamin_b12_100g": null,
                              "vitamin_b1_100g": null,
                              "vitamin_b2_100g": null,
                              "vitamin_b3_100g": null,
                              "vitamin_b5_100g": null,
                              "vitamin_b6_100g": null,
                              "vitamin_b9_100g": 0,
                              "vitamin_c_100g": 0,
                              "vitamin_d_100g": null,
                              "vitamin_e_100g": null,
                              "vitamin_k1_100g": null,
                              "water_100g": null,
                              "zinc_100g": null
                          }
                      },
                      "ingredients": [],
                      "quantity": 40
                  },
                  {
                      "confidence": 0.0073,
                      "food_info": {
                          "display_name": "Zucchini flan",
                          "food_id": "b8c2eeb2e8567a87daa8d7367972eb93",
                          "fv_grade": "B",
                          "g_per_serving": 80,
                          "nutrition": {
                              "alcohol_100g": 0,
                              "calcium_100g": 0.0271,
                              "calories_100g": 107,
                              "carbs_100g": 4.28,
                              "chloride_100g": null,
                              "cholesterol_100g": 0.0308,
                              "copper_100g": null,
                              "fat_100g": 7.83,
                              "fibers_100g": 1.31,
                              "glycemic_index": 15,
                              "insat_fat_100g": 3.72,
                              "iodine_100g": null,
                              "iron_100g": 0.00056,
                              "magnesium_100g": 0.0141,
                              "manganese_100g": null,
                              "mono_fat_100g": 2.7,
                              "omega_3_100g": 0.042717,
                              "omega_6_100g": 0.855,
                              "phosphorus_100g": 0.0776,
                              "poly_fat_100g": 1.02,
                              "polyols_100g": null,
                              "potassium_100g": 0.184,
                              "proteins_100g": 4.32,
                              "salt_100g": null,
                              "sat_fat_100g": 1.71,
                              "selenium_100g": null,
                              "sodium_100g": 0.319,
                              "sugars_100g": 2.49,
                              "veg_percent": 0,
                              "vitamin_a_beta_k_100g": null,
                              "vitamin_a_retinol_100g": null,
                              "vitamin_b12_100g": null,
                              "vitamin_b1_100g": null,
                              "vitamin_b2_100g": null,
                              "vitamin_b3_100g": null,
                              "vitamin_b5_100g": null,
                              "vitamin_b6_100g": null,
                              "vitamin_b9_100g": 0.0000212,
                              "vitamin_c_100g": 0.00486,
                              "vitamin_d_100g": null,
                              "vitamin_e_100g": null,
                              "vitamin_k1_100g": null,
                              "water_100g": null,
                              "zinc_100g": null
                          }
                      },
                      "ingredients": [],
                      "quantity": 80
                  },
                  {
                      "confidence": 0.0004,
                      "food_info": {
                          "display_name": "Beef Meatballs",
                          "food_id": "16e8d55e29f5937ec0d39c4608ebbc1f",
                          "fv_grade": "B",
                          "g_per_serving": 40,
                          "nutrition": {
                              "alcohol_100g": 0,
                              "calcium_100g": 0.029,
                              "calories_100g": 202,
                              "carbs_100g": 5.1,
                              "chloride_100g": null,
                              "cholesterol_100g": 0.037,
                              "copper_100g": null,
                              "fat_100g": 13.3,
                              "fibers_100g": 0.6,
                              "glycemic_index": 0,
                              "insat_fat_100g": 5.566,
                              "iodine_100g": null,
                              "iron_100g": 0.0022,
                              "magnesium_100g": 0.0269,
                              "manganese_100g": null,
                              "mono_fat_100g": 4.95,
                              "omega_3_100g": 0.04577,
                              "omega_6_100g": 0.2613,
                              "phosphorus_100g": 0.172,
                              "poly_fat_100g": 0.616,
                              "polyols_100g": null,
                              "potassium_100g": 0.326,
                              "proteins_100g": 15.2,
                              "salt_100g": null,
                              "sat_fat_100g": 4.88,
                              "selenium_100g": null,
                              "sodium_100g": 0.452,
                              "sugars_100g": 0.944,
                              "veg_percent": 0,
                              "vitamin_a_beta_k_100g": null,
                              "vitamin_a_retinol_100g": null,
                              "vitamin_b12_100g": null,
                              "vitamin_b1_100g": null,
                              "vitamin_b2_100g": null,
                              "vitamin_b3_100g": null,
                              "vitamin_b5_100g": null,
                              "vitamin_b6_100g": null,
                              "vitamin_b9_100g": 0.0000258,
                              "vitamin_c_100g": 0.00694,
                              "vitamin_d_100g": null,
                              "vitamin_e_100g": null,
                              "vitamin_k1_100g": null,
                              "water_100g": null,
                              "zinc_100g": null
                          }
                      },
                      "ingredients": [],
                      "quantity": 40
                  },
                  {
                      "confidence": 0.0001,
                      "food_info": {
                          "display_name": "Vegetable patties",
                          "food_id": "9897663ab892fd3ed5d214b98166f560",
                          "fv_grade": "C",
                          "g_per_serving": 80,
                          "nutrition": {
                              "alcohol_100g": 0,
                              "calcium_100g": 0,
                              "calories_100g": 93.7,
                              "carbs_100g": 6.6,
                              "chloride_100g": null,
                              "cholesterol_100g": 0,
                              "copper_100g": null,
                              "fat_100g": 5.4,
                              "fibers_100g": 2.6,
                              "glycemic_index": 50,
                              "insat_fat_100g": 0,
                              "iodine_100g": null,
                              "iron_100g": 0,
                              "magnesium_100g": 0,
                              "manganese_100g": null,
                              "mono_fat_100g": 0,
                              "omega_3_100g": 0,
                              "omega_6_100g": 0,
                              "phosphorus_100g": 0,
                              "poly_fat_100g": 0,
                              "polyols_100g": null,
                              "potassium_100g": 0,
                              "proteins_100g": 3.3,
                              "salt_100g": null,
                              "sat_fat_100g": 0,
                              "selenium_100g": null,
                              "sodium_100g": 0,
                              "sugars_100g": 0,
                              "veg_percent": 0,
                              "vitamin_a_beta_k_100g": null,
                              "vitamin_a_retinol_100g": null,
                              "vitamin_b12_100g": null,
                              "vitamin_b1_100g": null,
                              "vitamin_b2_100g": null,
                              "vitamin_b3_100g": null,
                              "vitamin_b5_100g": null,
                              "vitamin_b6_100g": null,
                              "vitamin_b9_100g": 0,
                              "vitamin_c_100g": 0,
                              "vitamin_d_100g": null,
                              "vitamin_e_100g": null,
                              "vitamin_k1_100g": null,
                              "water_100g": null,
                              "zinc_100g": null
                          }
                      },
                      "ingredients": [],
                      "quantity": 80
                  }
              ],
              "position": {
                  "height": 0.6631,
                  "width": 0.661,
                  "x": 0.1663,
                  "y": 0.2596
              }
          }
        ],
        "scopes": [
            "quantity",
            "nutrition:macro",
            "position",
            "nutrition:nutriscore",
            "nutrition:micro",
            "multiple_items"
        ]
      }));
      if (sessionStorage.getItem("foodsFound")) {
        console.log("Image uploaded successfully!");
        // wait for the results to be parsed
        const parsed = await parseResults();
        if (parsed) {
          router.push(`/home/results`);
        } else {
          console.log("Something went wrong while parsing the results");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong while uploading your image.");
    }

    // axios.post('https://food-finder-dr3kfl0iz-james-yangs-projects-b85f648d.vercel.app/api/analyze', formData)
    // .then((res) => {
    //   // Store response in state
    //   sessionStorage.setItem("foodsFound", res.data);
    //   console.log("Image uploaded successfully!");
    //   // redirect to the results page
    //   router.push(`/results`);
    // })
    // .catch((err) => {
    //   console.error(err);
    //   console.log("Something went wrong while uploading your image.");
    // });



  };

  // Handle file change when user selects a file to upload
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is too big, max size is 5MB
      if (file.size > 1024 * 1024 * 5) {
        alert("File is too big! Max file size is 5MB.");
        return;
      }
      setFile(file);
    }
  };

  // Unused function to convert file to base64
  // const toBase64 = (file: File) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file as Blob);
  //   });
  // };

  return (
    <main>
      <form onSubmit={handleSubmission}>
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleChange}
        />
        <input type="submit" value="Upload" />
        {file && (
          <div className="w-[300px] text-black p-4">
            <Image
              src={URL.createObjectURL(file)}
              alt="Uploaded image"
              width={300}
              height={300}
            />
          </div>

        )}
      </form>
    </main>
  );
}
