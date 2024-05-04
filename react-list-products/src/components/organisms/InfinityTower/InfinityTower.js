import { useState } from 'react';
import { Button } from "@mantine/core";
import { useEthers, Sepolia } from '@usedapp/core';
import { FloorCreationModel } from '../FloorCreationModel';

export const InfinityTower = () => {
    const [floorCreationOpened, setFloorCreationOpened] = useState(false);
    const { account, chainId } = useEthers();

    return (
        <>
        <Button onClick = {() => setFloorCreationOpened(true)} variant='light' radius={8} disabled={!account || chainId !== Sepolia.chainId} 
            style={{position: 'fixed', bottom: 42, right: 42}}>
            Mint a new Floor
        </Button>
        <FloorCreationModel opened={floorCreationOpened} onClose={() => setFloorCreationOpened(false)}></FloorCreationModel>
        </>
    )

};
