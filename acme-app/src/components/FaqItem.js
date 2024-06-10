import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FaqItem = ({ faq }) => {
    const [visible, setVisible] = useState(false);

    const handleToggle = () => {
        setVisible(!visible);
    };

    return (
        <View style={visible ? styles.faqItemExpanded : null}>
            <TouchableOpacity style={styles.faqItem} onPress={handleToggle}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
            </TouchableOpacity>
            {visible && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    faqItem: {
        backgroundColor: 'rgba(54, 124, 255, 0.42)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    faqItemExpanded: {
        marginBottom: 20,
    },
    faqQuestion: {
        fontSize: 16,
        color: '#333',
    },
    faqAnswer: {
        fontSize: 16,
        color: '#555',
        padding: 10,
        paddingLeft: 20,
        backgroundColor: 'rgba(54, 124, 255, 0.2)',
        borderRadius: 10,
        marginTop: 5,
    },
});

export default FaqItem;
