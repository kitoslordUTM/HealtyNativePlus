import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { SearchBarProps, SuggestionType } from './utils';


export function SearchBar({
  placeholder = 'Buscar...',
  suggestionsList = [],
  onSearch = () => {},
  handleSecondEvent = () => {},
}: Partial<SearchBarProps>) {
  const [inputLabel, setInputLabel] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const filterSuggestions = useCallback(
    (query: string) => {
      return suggestionsList.filter((item) =>
        item.label?.toLowerCase().includes(query.toLowerCase()),
      );
    },
    [suggestionsList],
  );

  const handleChange = (text: string) => {
    setInputLabel(text);
    setSelectedValue('');
    setFilteredSuggestions(filterSuggestions(text));
    setHighlightedIndex(-1);
    handleSecondEvent(text);
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    setInputLabel(suggestion.label || '');
    setSelectedValue(suggestion.value);
    setFilteredSuggestions([]);
    Keyboard.dismiss(); // Oculta el teclado
    onSearch(suggestion.value);
  };

  const handleSubmit = () => {
    const query = selectedValue || inputLabel.trim();
    if (query) onSearch(query);
    setFilteredSuggestions([]); // Ocultar sugerencias después de la búsqueda
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSubmit} style={styles.searchIcon}>
          {/* Reemplaza esto por tu ícono SVG o un ícono de librería como Ionicons */}
          <Text>🔍</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={inputLabel}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          onBlur={() => setFilteredSuggestions([])}
        />
      </View>

      {filteredSuggestions.length > 0 && (
        <FlatList
          style={styles.suggestionsList}
          data={filteredSuggestions}
          keyExtractor={(item, index) => `${item.value}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.suggestionItem,
                highlightedIndex === index && styles.highlightedItem,
              ]}
              onPress={() => handleSuggestionClick(item)}
            >
              <Text style={styles.suggestionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  suggestionsList: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  highlightedItem: {
    backgroundColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
});
