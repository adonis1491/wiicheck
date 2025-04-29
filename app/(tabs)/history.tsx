import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, FileText, Download, Filter } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import PageHeader from '@/components/PageHeader';

type HistoryItem = {
  id: string;
  name: string;
  dosage: string;
  count: number;
  date: string;
  time: string;
  image: string;
  type: 'photo' | 'live';
};

export default function HistoryScreen() {
  const [filterActive, setFilterActive] = useState(false);
  
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      name: 'Acetylcysteine Capsule',
      dosage: '200mg',
      count: 107,
      date: '2024-01-15',
      time: '09:23 AM',
      image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg',
      type: 'photo'
    },
    {
      id: '2',
      name: 'Jikimycin Tablet',
      dosage: '50mg',
      count: 65,
      date: '2024-01-15',
      time: '11:47 AM',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMa80XndJurVn9Q4Y2Uigyfp_fUVCGKEFeA&s',
      type: 'live'
    },
    {
      id: '3',
      name: 'Amoxicillin',
      dosage: '500mg',
      count: 180,
      date: '2024-01-14',
      time: '02:15 PM',
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/12/full/1689175810-294.jpg?im=FitAndFill=(826,465)',
      type: 'photo'
    },
    {
      id: '4',
      name: 'Ibuprofen',
      dosage: '200mg',
      count: 83,
      date: '2024-01-14',
      time: '04:32 PM',
      image: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg',
      type: 'live'
    },
    {
      id: '5',
      name: 'Loratadine',
      dosage: '10mg',
      count: 24,
      date: '2024-01-13',
      time: '08:55 AM',
      image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg',
      type: 'photo'
    },
    {
      id: '6',
      name: 'Diazepam',
      dosage: '5mg',
      count: 42,
      date: '2024-01-12',
      time: '03:19 PM',
      image: 'https://images.pexels.com/photos/139398/white-tablets-pill-pharmacy-139398.jpeg',
      type: 'photo'
    },
    {
      id: '7',
      name: 'Metformin',
      dosage: '1000mg',
      count: 120,
      date: '2024-01-11',
      time: '10:47 AM',
      image: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg',
      type: 'live'
    },
  ];
  
  const renderDateHeader = (date: string, index: number) => {
    // Show date header if this is the first item or if the date is different from the previous item
    const shouldShowHeader = index === 0 || historyItems[index - 1].date !== date;
    
    if (!shouldShowHeader) return null;
    
    // Format date for display (assuming date is in YYYY-MM-DD format)
    const dateObj = new Date(date);
    const displayDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
    
    return (
      <View style={styles.dateHeader}>
        <Calendar size={18} color={Colors.gray600} style={{ marginRight: 8 }} />
        <Text style={styles.dateHeaderText}>{displayDate}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="History" />
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filterActive && styles.filterButtonActive]}
          onPress={() => setFilterActive(!filterActive)}
        >
          <Filter size={18} color={filterActive ? Colors.white : Colors.gray700} />
          <Text 
            style={[styles.filterText, filterActive && styles.filterTextActive]}
          >
            Filter
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.exportButton}>
          <FileText size={18} color={Colors.gray700} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={historyItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <>
            {renderDateHeader(item.date, index)}
            <TouchableOpacity style={styles.historyCard}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.medicationImage} 
              />
              
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>
                  {item.name} {item.dosage}
                </Text>
                
                <View style={styles.countTimeContainer}>
                  <View style={styles.countContainer}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                  
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item.time}</Text>
                    <View style={styles.typeIndicator}>
                      <Text style={styles.typeText}>
                        {item.type === 'photo' ? 'Photo' : 'Live'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.downloadButton}>
                <Download size={18} color={Colors.gray600} />
              </TouchableOpacity>
            </TouchableOpacity>
          </>
        )}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray700,
    marginLeft: 6,
  },
  filterTextActive: {
    color: Colors.white,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  exportText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray700,
    marginLeft: 6,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dateHeaderText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray600,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medicationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  medicationName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: Colors.gray900,
    marginBottom: 8,
  },
  countTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countContainer: {
    flex: 1,
  },
  countText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: Colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: Colors.gray500,
    marginRight: 6,
  },
  typeIndicator: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: Colors.gray700,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 8,
  },
});