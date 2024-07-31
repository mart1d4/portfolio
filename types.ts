// types.ts
import enDictionary from "@/dictionaries/en.json";
import frDictionary from "@/dictionaries/fr.json";

type EnDictionary = typeof enDictionary;
type FrDictionary = typeof frDictionary;

export type Dictionary = EnDictionary | FrDictionary;
