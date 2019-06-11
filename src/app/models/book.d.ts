declare interface BookDisplayProperties {
  type: string;
  image: string;
}

declare interface BookAttributes {
  urn: string;
  created_at: Date;
  updated_at: Date;
  content: string;
  properties?: any;
  display_properties: BookDisplayProperties;
}

declare interface Relation {
  self: string;
  related: string;
}

declare interface Relationships {
  authors: Relation;
  publishers: Relation;
}

declare interface Book {
  id: string;
  type: string;
  links: { self: string };
  attributes: BookAttributes;
  relationships: Relationships;
}


declare interface BookTableItem {
  type: string;
  name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}
