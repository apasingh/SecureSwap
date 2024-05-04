import { ColorInput, Modal, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormEvent } from "react";

export type FloorCreationModelProps = {
    opened: boolean;
    onClose: () => void;
}

export const FloorCreationModel = ({opened, onClose}:FloorCreationModelProps) => {
    const form = useForm({
        initialValues: {
            ownerName: "",
            message: "",
            link: "",
            color: "#b07c5e", //putting in default colors, this step not required
            windowsTint: "#b9eaed",
        }
    });
    
    // const handleSubmit = async (values: typeof form.values) =>{
    //     console.log(values);
    // }

//     return(
//      <Modal opened={opened} onClose={onClose} title="Create a new floor">
//        <form.onSubmit={form.onSubmit(handleSubmit)}>
//             <TextInput required label="Owner name" placeholder="Satoshi Nakamoto" {...form.getInputProps("ownerName")}></TextInput>
//        </form>
//     </Modal>
//     );
// }; 

    const handleSubmit = async (values: typeof form.values, event: FormEvent<HTMLFormElement> | undefined) => {
        event?.preventDefault(); // Prevent default form submission behavior
        console.log(values);
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Create a new floor">
            <form onSubmit={(event) => form.onSubmit(() => handleSubmit(form.values, event))}>
                <TextInput required label="Owner name" placeholder="Satoshi Nakamoto" {...form.getInputProps("ownerName")} />
                <TextInput label="Message" placeholder="Hello World" {...form.getInputProps("message")} />
                <TextInput label="Link" placeholder="https://usedapp-docs.netlify.app/docs" {...form.getInputProps("link")} />
                <ColorInput required label="Color" {...form.getInputProps("color")} />
                <ColorInput required label="Windows Tint" {...form.getInputProps("windowsTint")} />
            <Group style={{ justifyContent: 'right' }}> <Button type="submit"> Mint </Button></Group>
            </form>
        </Modal>
    );
};