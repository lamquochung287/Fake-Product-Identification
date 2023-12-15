import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const DeleteConfirmation = ({ isVisible, message, onCancel, onConfirm }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, border: 1,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                }}>
                    <Text style={{ fontSize: 14 }}>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={{ fontSize: 13 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={{ fontSize: 13 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteConfirmation;
