"use client";

import { useState } from "react";
import {
    Container,
    Group,
    Text,
    Button,
    TextInput,
    Select,
    RangeSlider,
    Flex,
} from "@mantine/core";
import { IconSearch, IconMapPin, IconUsers } from "@tabler/icons-react";
import "../app/dashboard.css"
import { CreateJobModal, useCreateJobModal } from "./createJobModal";
import { JobFiltersWithHandlers } from "./JobFilters";

export default function Navbar() {
    const { opened, openModal, closeModal } = useCreateJobModal();

    const handleJobCreated = () => { }

    return (
        <Container size="xxl" mb="xl" pt="xl" style={{ backgroundColor: "#fff", boxShadow: "0 5px 10px -5px rgba(90,90,90,0.2)" }}>
            <Container size="xl">
                <Group className="navbar" justify="space-between" p="sm">
                    <Text size="lg" className="logo">
                        🚀
                    </Text>
                    <Text className="text">Home</Text>
                    <Text className="text">Find Jobs</Text>
                    <Text className="text">Find Talents</Text>
                    <Text className="text">About us</Text>
                    <Text className="text">Testimonials</Text>
                    <Button className="action-button" onClick={openModal}>
                        Create Jobs
                    </Button>

                    <CreateJobModal
                        opened={opened}
                        onClose={closeModal}
                        onJobCreated={handleJobCreated}
                    />

                </Group>
                <JobFiltersWithHandlers/>
                
            </Container>

        </Container>
    );
}
