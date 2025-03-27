import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, TextInput, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { SearchBarProps, SuggestionType } from './utils';
import StyleSheet from 'react-native-media-query';



export default function SearchBar({
  placeholder = 'Buscar...',
  suggestionsList = [],
  onSearch = () => {},
  handleSecondEvent = () => {},
  value
}: SearchBarProps) {
  const [inputLabel, setInputLabel] = useState<string>(value || ''); // Sincronizamos con la prop value
  const [selectedValue, setSelectedValue] = useState<string>(''); // Valor seleccionado al hacer clic
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([]); // Valores sugeridos
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Función para mostrar valores sugeridos
  const filterSuggestions = useCallback(
    (query: string) => {
      return suggestionsList.filter((item) =>
        item.label?.toLowerCase().includes(query.toLowerCase())
      );
    },
    [suggestionsList]
  );

  // Efecto para sincronizar el valor de inputLabel con el prop value
  useEffect(() => {
    if (value !== undefined) {
      setInputLabel(value);
    }
  }, [value]);

  // Función para actualizar el inputLabel
  const handleChange = (query: string) => {
    setInputLabel(query);
    setSelectedValue('');
    setFilteredSuggestions(filterSuggestions(query));
    setShowSuggestions(true);
    setHighlightedIndex(-1);
    handleSecondEvent(query);
  };

  const search = (query: string) => {
    onSearch(query);
  };

  // Función para cancelar la búsqueda y reiniciar el filtro
  const handleCancel = () => {
    setInputLabel('');
    setSelectedValue('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    search(''); // Reinicia el filtro
  };

  // Actualizamos handleSuggestionClick para ejecutar la búsqueda correctamente
  const handleSuggestionClick = (query: string) => {
    search(query); // Ejecuta la búsqueda con la sugerencia seleccionada
    setInputLabel(query); // Actualiza el inputLabel con el valor de la sugerencia
    setSelectedValue(query); // Establece el valor seleccionado
    setShowSuggestions(false); // Oculta las sugerencias
  };

  const highlightNext = () => {
    setHighlightedIndex((prevIndex) => {
      const nextIndex = Math.min(filteredSuggestions.length - 1, prevIndex + 1);
      document
        .querySelector(`.suggestion-item[data-index="${nextIndex}"]`)
        ?.scrollIntoView({ block: 'nearest' });
      return nextIndex;
    });
  };

  const highlightPrevious = () => {
    setHighlightedIndex((prevIndex) => {
      const nextIndex = Math.max(0, prevIndex - 1);
      document
        .querySelector(`.suggestion-item[data-index="${nextIndex}"]`)
        ?.scrollIntoView({ block: 'nearest' });
      return nextIndex;
    });
  };

  const handleKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'ArrowDown') {
      highlightNext();
    } else if (e.nativeEvent.key === 'ArrowUp') {
      highlightPrevious();
    } else if (e.nativeEvent.key === 'Enter') {
      e.preventDefault?.(); // Solo si la función existe
      if (highlightedIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[highlightedIndex].label || ''); // Llama a la búsqueda con la sugerencia seleccionada
      } else {
        handleSubmit();
      }
    }
  };

  // Función que busca el valor
  const handleSubmit = () => {
    const query = selectedValue || inputLabel.trim();
    if (query) onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name='search' size={25} color={'white'} />
        </TouchableOpacity>

        <TextInput
          style={styles.inputSearch}
          placeholder={placeholder}
          onChangeText={handleChange} // ✅ Cambiado
          onBlur={() => setShowSuggestions(false)}
          onFocus={() => inputLabel && setShowSuggestions(true)}
          value={inputLabel}
          onKeyPress={handleKeyDown} // ✅ Cambiado
        />

        {inputLabel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={!inputLabel}
          >
            <Text style={{color:'white'}}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && (
        <View style={styles.suggestionsList}>
          {filteredSuggestions.length > 0 ? (
            <FlatList
              data={filteredSuggestions}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.suggestionItem,
                    highlightedIndex === index && styles.suggestionItemHighlighted,
                  ]}
                  onPress={() => handleSuggestionClick(item.value || '')} // Cambié item.label
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.noSuggestions}>No se encontraron resultados</Text>
          )}
        </View>
      )}
    </View>
  );
}

const {styles, ids} = StyleSheet.create({

  searchBarContainer: {
    position: "relative",
    width: "100%", // Adaptado para móviles
    maxWidth: 400,
    minWidth: 200,
    zIndex: 1,
    marginBottom: 15,
    overflow: 'scroll',
    
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: "#11275d",
    width: "100%",
    gap: 8,
    overflow: 'scroll',
   
  },

  inputSearch: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "white",
    color:'white',
    backgroundColor:'white'
  },

  suggestionsList: {
    position: 'relative',
    top: 0, // Ajusta esto según sea necesario
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    maxHeight: 150, // Máximo de altura, para que no ocupe toda la pantalla
    zIndex: 10, // Asegúrate de que las sugerencias estén por encima de otros elementos
    overflow: 'scroll', // Permite el desplazamiento si las sugerencias son muchas
  },

  suggestionItem: {
    padding: 10,
    fontSize: 14,
  },

  suggestionItemHighlighted: {
    backgroundColor: "#f0f0f0",
  },

  noSuggestions: {
    color: "#888",
    fontSize: 14,
    padding: 10,
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 70,
    marginLeft: 8,
    marginRight: 16,
    color: "#999",
  },

  cancelButtonHover: {
    color: "white",
  },
})

