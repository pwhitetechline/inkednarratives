declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"Mastering-the-Art-of-Show-Dont-Tell.md": {
	id: "Mastering-the-Art-of-Show-Dont-Tell.md";
  slug: "mastering-the-art-of-show-dont-tell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"art-of-storytelling.md": {
	id: "art-of-storytelling.md";
  slug: "art-of-storytelling";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"overcoming-writer-s-block-practical-tips-to-get-the-words-flowing.md": {
	id: "overcoming-writer-s-block-practical-tips-to-get-the-words-flowing.md";
  slug: "overcoming-writer-s-block-practical-tips-to-get-the-words-flowing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"self-care-for-writers-protecting-your-mind-and-body.md": {
	id: "self-care-for-writers-protecting-your-mind-and-body.md";
  slug: "self-care-for-writers-protecting-your-mind-and-body";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setting-realistic-goals-how-to-dream-big-and-still-succeed.md": {
	id: "setting-realistic-goals-how-to-dream-big-and-still-succeed.md";
  slug: "setting-realistic-goals-how-to-dream-big-and-still-succeed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tools-every-writer-needs-from-software-to-notebooks.md": {
	id: "tools-every-writer-needs-from-software-to-notebooks.md";
  slug: "tools-every-writer-needs-from-software-to-notebooks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"writing-tips-beginners.md": {
	id: "writing-tips-beginners.md";
  slug: "writing-tips-beginners";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"stories": {
"cyber-shinobi.md": {
	id: "cyber-shinobi.md";
  slug: "cyber-shinobi";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/chapter-1.md": {
	id: "love-in-the-lemon-grove/chapter-1.md";
  slug: "love-in-the-lemon-grove/chapter-1";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/chapter-2.md": {
	id: "love-in-the-lemon-grove/chapter-2.md";
  slug: "love-in-the-lemon-grove/chapter-2";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/chapter-3.md": {
	id: "love-in-the-lemon-grove/chapter-3.md";
  slug: "love-in-the-lemon-grove/chapter-3";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/chapter-4.md": {
	id: "love-in-the-lemon-grove/chapter-4.md";
  slug: "love-in-the-lemon-grove/chapter-4";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/chapter-5.md": {
	id: "love-in-the-lemon-grove/chapter-5.md";
  slug: "love-in-the-lemon-grove/chapter-5";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"love-in-the-lemon-grove/index.md": {
	id: "love-in-the-lemon-grove/index.md";
  slug: "love-in-the-lemon-grove";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"seeds-of-redemption.md": {
	id: "seeds-of-redemption.md";
  slug: "seeds-of-redemption";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
"the-last-night.md": {
	id: "the-last-night.md";
  slug: "the-last-night";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"public": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
