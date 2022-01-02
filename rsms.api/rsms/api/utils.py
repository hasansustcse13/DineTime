from enum import IntEnum


class DayOfWeek(IntEnum):
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
