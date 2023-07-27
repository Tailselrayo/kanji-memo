export function computeLvlFromXp(xp: number) {
    if (xp >= 30) {
        return 5;
    }
    else if (xp >= 15) {
        return 4;
    }
    else if (xp >= 7) {
        return 3;
    }
    else if (xp >= 3) {
        return 2;
    }
    else {
        return 1;
    }
}