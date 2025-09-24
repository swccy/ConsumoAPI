import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false); 
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getAvatarUrl = (id) => {
    return `https://i.pravatar.cc/150?img=${id}`;
  };

  return (
    <View style={{ padding: 20, flex: 1, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Lista de Usuários
      </Text>

      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10 }}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginVertical: 8, 
              padding: 12, 
              backgroundColor: '#fff', 
              borderRadius: 8,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}>
              <Image
                source={{ uri: getAvatarUrl(item.id) }}
                style={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: 25, 
                  marginRight: 15,
                  backgroundColor: '#e0e0e0'
                }}
                onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#666', fontSize: 12 }}>
                  {item.email}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}