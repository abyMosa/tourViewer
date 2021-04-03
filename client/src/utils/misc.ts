
export const updateObject = (obj: any, updatedProps: any) => {
    return {
        ...obj,
        ...updatedProps
    }
}