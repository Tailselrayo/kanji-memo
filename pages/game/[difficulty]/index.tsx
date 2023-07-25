import { Loader } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

interface GameProps {
    difficulty: number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params = context.params;
    const difficulty = parseInt(params?.difficulty as string);
    if (!difficulty||Array.isArray(difficulty)||isNaN(difficulty)) {
        return ({
            redirect: {
                destination: "/",
                permanent: false,
            }
        })
    }
    if (difficulty < 0 || difficulty > 6) {
        return ({
            redirect: {
                destination: "/",
                permanent: false,
            }
        })
    }
    return ({
        props: {difficulty: difficulty}
    })
}

export default function Game(props: GameProps) {
    console.log(props.difficulty)
    return(
        <Loader></Loader>
    )
}