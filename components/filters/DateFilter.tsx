import React, { useState } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type DateFilterProps = {
  handleSubmit: (formattedDate: string) => void;
  status: (date: string) => void;
  startDate: string;
  refetch: () => void;
};

export default function DateFilter({ handleSubmit, status, refetch, startDate }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visible, setIsVisible] = useState(false);

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setIsVisible(false);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      handleSubmit(formattedDate);
    }
  };

  const handleReset = () => {
    status('');
    refetch();
    setSelectedDate(new Date());
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {startDate && (
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={{ color: 'white', fontWeight: '500' }}>Reset</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={() => setIsVisible(true)}>
          <Text style={styles.buttonText}>
            {`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}
          </Text>
        </TouchableOpacity>
      </View>

      {visible && (
        <RNDateTimePicker
          onChange={setDate}
          minimumDate={new Date(2025, 0, 1)}
          value={selectedDate}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',      // Alinea todo a la derecha
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 16,       // Añade padding para separarlo del borde
  },
  buttonContainer: {
    flexDirection: 'row',         // Alinea los botones en fila normal
    justifyContent: 'flex-end',   // Empuja todo hacia la derecha
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0A2240",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
