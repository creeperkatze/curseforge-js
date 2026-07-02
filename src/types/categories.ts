/** A mod category or class. */
export interface Category {
  /** The category id. */
  id: number;
  /** The game id related to the category. */
  gameId: number;
  /** Category name. */
  name: string;
  /** The category slug as it appears in the URL. */
  slug: string;
  /** The category URL. */
  url: string;
  /** URL for the category icon. */
  iconUrl: string;
  /** Last modified date of the category. */
  dateModified: string;
  /** Whether this is a top level category for other categories (a "class"). */
  isClass: boolean | null;
  /** The class id of the category, meaning the class of which this category is under. */
  classId: number | null;
  /** The parent category for this category. */
  parentCategoryId: number | null;
  /** The display index for this category. */
  displayIndex: number | null;
}

/** Query parameters for {@link CategoriesApi.list}. */
export interface GetCategoriesOptions {
  /** A game unique id. */
  gameId: number;
  /** A class unique id. */
  classId?: number;
  /** Used with `gameId` to return only the classes for that game. */
  classesOnly?: boolean;
}
