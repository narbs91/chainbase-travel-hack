import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import styles from './page.module.css'

export default function Loading() {
    return (

        <Stack className={styles.description}>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack> 
    )
  }