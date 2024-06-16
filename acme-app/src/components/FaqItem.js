import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FaqItem = ({ faq }) => {
    const [visible, setVisible] = useState(false);

    const handleToggle = () => {
        setVisible(!visible);
    };

    return (
        <View style={visible ? styles.faqItemExpanded : styles.faqItemContainer}>
            <TouchableOpacity style={styles.faqItem} onPress={handleToggle}>
                <Icon name="question-circle" size={24} color="#367CFF" style={styles.faqIcon} />
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon name={visible ? "chevron-up" : "chevron-down"} size={20} color="#367CFF" style={styles.chevronIcon} />
            </TouchableOpacity>
            {visible && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    faqItemContainer: {
        marginBottom: 10,
    },
    faqItem: {
        backgroundColor: '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    faqItemExpanded: {
        backgroundColor: '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    faqIcon: {
        marginRight: 15,
    },
    faqQuestion: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    faqAnswer: {
        fontSize: 16,
        color: '#555',
        padding: 10,
        paddingLeft: 20,
        backgroundColor: '#DDE8FF',
        borderRadius: 10,
        marginTop: 10,
    },
    chevronIcon: {
        marginLeft: 10,
    },
});

export default FaqItem;
