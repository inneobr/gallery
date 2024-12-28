import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Loading } from './loading';

const { width, height } = Dimensions.get('window');
const IMAGE_SIZE = 80;
const SPACING = 10;

interface Props {
    id: number;
    url: string;
}

const data: Props[] = [
    { id: 1, url: "https://wallpapers.com/images/hd/1080x1920-90lf8o55k3hi51kk.jpg" },
    { id: 2, url: "https://wallpapers.com/images/hd/1080x1920-wjc7btqdsleojlw9.jpg" },
    { id: 3, url: "https://wallpapers.com/images/high/1080x1920-otqm6spdrb6vewuy.webp" },
    { id: 4, url: "https://wallpapers.com/images/high/1080x1920-c5ru1ii3gn9ki8cw.webp" },
    { id: 5, url: "https://wallpapers.com/images/high/1080x1920-l3zem6fbbi2z7i8y.webp" },
    { id: 6, url: "https://wallpapers.com/images/high/1080x1920-4hg9ru42gm062qfe.webp" },
];

export default function Gallery() {
    const [images, setImages] = useState<Props[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const topRef = useRef<FlatList>(null);
    const thumbRef = useRef<FlatList>(null);

    const findAll = () => {
        setImages(data); 
    };

    const scrollActiveIndex = (index: number): void => {
        setActiveIndex(index);
        topRef?.current?.scrollToOffset({
            offset: index * width, 
            animated: true, 
        });

        const thumbnailOffset = index * (IMAGE_SIZE + SPACING) - (width / 2) + ((IMAGE_SIZE) / 2);
        if (thumbnailOffset > 0) {
            thumbRef?.current?.scrollToOffset({
                offset: thumbnailOffset,
                animated: true,
            });
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    };

    useEffect(() => {
        findAll();
    }, []);

    if (!images) return <Loading />; 

    return (
        <View style={css.container}>
            <FlatList
                horizontal
                ref={topRef}
                data={images}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                onMomentumScrollEnd={ev => {
                    setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
                }}
                renderItem={({ item }) => (
                    <View style={{ width, height }}>
                        <Image source={{ uri: item.url }} style={StyleSheet.absoluteFillObject} />
                    </View>
                )}
            />

            <FlatList
                horizontal
                ref={thumbRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                style={css.gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => scrollActiveIndex(index)}>
                        <Image
                            source={{ uri: item.url }}
                            style={[
                                css.thumbnail
                            ]}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const css = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: "100%",
        width: width,
    },

    gallery: {
        paddingHorizontal: SPACING,
        position: 'absolute',
        bottom: IMAGE_SIZE,
        borderRadius: 8,
    },

    thumbnail: {
        marginRight: SPACING,
        height: IMAGE_SIZE,
        width:  IMAGE_SIZE,
        borderRadius: 12,
    },
});