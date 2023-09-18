"use client"; // This is a client component

import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Characters.module.css';
import Pagination from './Pagination';

type Character = {
  id: number;
  name: string;
  image: string;
};

export default function CharacterFeed() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);

  const fetchCharacters = async () => {
    try {
      const actualPage = Math.ceil(page / 2);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${actualPage}`);
      const charactersToDisplay = (page % 2 === 1) 
        ? response.data.results.slice(0, 10)
        : response.data.results.slice(10);
      setCharacters(charactersToDisplay);
      setTotalCharacters(response.data.info.count);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rick And Morty Characters</h1>
      <div className={styles.gridContainer}>
          {characters.map(character => (
              <div key={character.id}>
                  <div className={styles.characterCard}>
                      <Image 
                          src={character.image} 
                          alt={character.name} 
                          layout="fill" 
                          className={styles.characterImage}
                      />
                  </div>
                  <p className={styles.characterName}>{character.name}</p>
              </div>
          ))}
      </div>
      <Pagination 
        currentPage={page}
        total={totalCharacters}
        onPageChange={setPage}
      />
    </div>
  );
}
