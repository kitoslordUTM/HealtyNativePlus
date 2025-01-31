export type SuggestionType = {
    label: string | undefined;
    value: string;
  };
  
  export type SearchBarProps = {
    placeholder?: string;
    suggestionsList?: SuggestionType[];
    onSearch?: (query: string) => void;
    handleSecondEvent?: (query: string) => void;
  };
  
  