function calcSetBits(num: number): number {
    const binStr = num.toString(2);
    return binStr.match(/1/g)?.length ?? 0;
}

function sameSetBits(num1: number, num2: number): boolean {
    return calcSetBits(num1) === calcSetBits(num2);
}

function calsSameAreas(
    nums: number[]
): Array<{ startArea: number; lengthArea: number }> {
    const result: Array<{ startArea: number; lengthArea: number }> = [];
    let currIdx = 0;
    let startArea = 0;
    let lengthArea = 1;
    do {
        if (
            currIdx + 1 < nums.length &&
            sameSetBits(nums[currIdx], nums[currIdx + 1])
        ) {
            lengthArea++;
        } else {
            result.push({ startArea, lengthArea });
            startArea = currIdx + 1;
            lengthArea = 1;
        }

        currIdx++;
    } while (currIdx < nums.length);

    return result;
}

function sortArrayPart(
    nums: number[],
    startPos: number,
    length: number
): number[] {
    return [
        ...nums.slice(0, startPos),
        ...nums.slice(startPos, startPos + length).sort((a, b) => a - b),
        ...nums.slice(startPos + length),
    ];
}

function clamp(val: number, min: number, max: number): number {
    return val > max ? max : val < min ? min : val;
}

function canSortArray(nums: number[]): boolean {
    const equalSetBitsPoses: Array<{ startArea: number; lengthArea: number }> =
        calsSameAreas(nums);
    const sortedArr = equalSetBitsPoses.reduce(
        (acc, curr) => sortArrayPart(acc, curr.startArea, curr.lengthArea),
        nums
    );
    return sortedArr.every(
        (val, idx, arr) => arr[idx] <= arr[clamp(idx + 1, 0, arr.length - 1)]
    );
}

function mergeAlternately(word1: string, word2: string): string {
    let result = "";
    const minLength = Math.min(word1.length, word2.length);
    const maxLength = Math.max(word1.length, word2.length);
    for (let i = 0; i < minLength; i++) {
        result = result + word1[i] + word2[i];
    }
    result = result + word1.slice(minLength) + word2.slice(minLength);

    return result;
}

// Definition for singly-linked list.
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function listLength(l: ListNode): number {
    let res = 0;
    let curr: ListNode | null = l;
    do {
        res++;
        curr = curr.next;
    } while (curr);

    return res;
}

function nThChild(l: ListNode, num: number): ListNode | null {
    let counter = 0;
    let curr: ListNode | null | undefined = l;
    while (counter < num) {
        counter++;
        curr = curr?.next;
    }

    return curr;
}

function valByNum(l: ListNode | null, num: number): number {
    if (!l) {
        return 0;
    }
    const length = listLength(l);
    if (num > length) {
        return 0;
    }

    return nThChild(l, length - num)?.val ?? 0;
}

function listNodeToString(l: ListNode | null): string {
    let res = "";
    while (l) {
        res = res + l.val.toString();
        l = l.next;
    }

    return res;
}

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    const length1 = l1 ? listLength(l1) : 0;
    const length2 = l2 ? listLength(l2) : 0;

    let maxLength = Math.max(length1, length2);
    let i = 1;
    let res: ListNode | null = null;
    let carry = 0;
    while (i <= maxLength) {
        const dig1 = valByNum(l1, i);
        const dig2 = valByNum(l2, i);
        res = new ListNode((dig1 + dig2 + carry) % 10, res);
        carry = Math.floor((dig1 + dig2 + carry) / 10);
        i++;
    }

    if (carry > 0) {
        res = new ListNode(carry, res);
    }

    return res;
}

const l1 = new ListNode(5);
const l2 = new ListNode(5);

function makeCharMap(s: string): Map<string, number> {
    const res = new Map<string, number>();
    s.split("").forEach((sym) => {
        res.set(sym, (res.get(sym) ?? 0) + 1);
    });
    return res;
}

function isAnagram(s: string, t: string): boolean {
    const sMap = makeCharMap(s);
    const tMap = makeCharMap(t);
    if (sMap.size !== tMap.size) {
        return false;
    }
    for (const skey of sMap.keys()) {
        if (!tMap.has(skey)) {
            return false;
        }

        if (sMap.get(skey) !== tMap.get(skey)) {
            return false;
        }
    }

    return true;
}

function repeatedSubstringPattern(s: string): boolean {
    let currLen = 1;
    while (currLen <= Math.floor(s.length / 2)) {
        if (s.length % currLen === 0) {
            const r = new RegExp(`.{${currLen}}`, "g");
            const arr = [...s.matchAll(r)].flat();
            if (arr.every((s, index, a) => s === a[0])) {
                return true;
            }
        }
        currLen++;
    }

    return false;
}

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    const nonZeroes = nums.filter((n) => n !== 0);
    nums.fill(0);
    nonZeroes.forEach((n, index) => (nums[index] = n));
}

function plusOne(digits: number[]): number[] {
    digits[digits.length - 1] += 1;

    for (let i = digits.length - 2; i >= 0; i--) {
        if (digits[i + 1] > 9) {
            digits[i + 1] -= 10;
            digits[i] += 1;
        }
    }

    if (digits[0] > 9) {
        digits[0] -= 10;
        digits.splice(0, 0, 1);
    }

    return digits;
}

function signFunc(x: number) {
    return x === 0 ? 0 : x > 0 ? 1 : -1;
}

function arraySign(nums: number[]): number {
    const prod = nums.reduce((prev, curr) => signFunc(prev * curr));
    return signFunc(prod);
}

const a = [
    1, 28, -91, -62, -36, -1, -84, -90, -92, 61, 6, -58, -60, 2, 51, -15, -18,
    -81, 87, 84, 100, -84, -13, -87, -33, 72, -72, -59, -79, 28, -69, -97, -93,
    17, 67, 11, -12, 19, 5, 42, -85, 71, -77, -82, 26, -58, -51, -14, 63, -85,
    -86, 66, 47, 57, -86, -25, -75, 59, -17, -71, 89, -78, -42, 30, 39, 61, -96,
    -30, -29, -92, -90, 69, 20, 65, 32, 92, 44, -71, -18, 87, -86, 23, -96, -21,
    -49, -96, -98, 35, -11, -1, 81, -48, 68, 5, 75, 57, -30, -7, 32, 86, -29,
    -86, -61, 45, -31, -93, -26, -9, 86, 57, -52, 75, 68, -58, 14, 27, -94, 47,
    -38, -44, 75, -83, 21, -83, 43, 62, 74, 97, 78, 43, 54, 28, 64, -19, -89,
    88, 68, 18, -96, -83, -25, -71, 88, -84, -24, -61, 72, -90, -56, 29, 46, 56,
    51, 16, 66, -2, 65, -95, 16, 51, 42, 61, 99, 89, -93, 59, -99, 69, 26, -61,
    21, 41, 40, -4, -49, 3, -96, 57, 65, 72, -41, -77, -4, 61, 71, -88, 21, -95,
    38, 64, 92, 0, -63,
];

function canMakeArithmeticProgression(arr: number[]): boolean {
    return (
        arr.length < 2 ||
        arr
            .sort((a, b) => a - b)
            .every(
                (val, index, arr) =>
                    index < 2 || arr[index - 1] - val === arr[0] - arr[1]
            )
    );
}

function maximumBeauty_(items: number[][], queries: number[]): number[] {
    return queries.map((q) => {
        return items.reduce(
            (prev, curr) => (curr[1] > prev[1] && curr[0] <= q ? curr : prev),
            [0, 0]
        )[1];
    });
}

function findPriceIndex(sortedByPrice: number[][], price: number): number {
    let start = 0;
    let end = sortedByPrice.length - 1;
    if (sortedByPrice[start][0] > price) {
        return -1;
    }

    if (sortedByPrice[start][0] === price) {
        while (
            start + 1 < sortedByPrice.length &&
            sortedByPrice[start + 1][0] === price
        )
            start++;
        return start;
    }

    if (sortedByPrice[end][0] <= price) {
        return end;
    }

    let changed = false;
    do {
        let mid = Math.floor((start + end) / 2);
        if (sortedByPrice[mid][0] > price) {
            changed = end !== mid;
            end = mid;
        } else {
            if (sortedByPrice[mid + 1][0] > price) {
                return mid;
            }
            changed = start !== mid + 1;
            start = mid + 1;
        }
    } while (changed);

    while (
        start + 1 < sortedByPrice.length &&
        sortedByPrice[start + 1][0] === price
    )
        start++;
    return start;
}

function maximumBeauty(items: number[][], queries: number[]): number[] {
    const sortedByPrice = items.sort((a, b) => a[0] - b[0]);
    const preCalcB = new Array<number>(items.length).fill(0);

    const qToB = new Map<number, number>();

    return queries.map((q) => {
        if (qToB.has(q)) {
            return qToB.get(q) ?? 0;
        }
        const priceIdx = findPriceIndex(sortedByPrice, q);
        if (priceIdx < 0) {
            return 0;
        }
        let startIdx = priceIdx;
        while (preCalcB[startIdx] === 0 && startIdx >= 0) {
            startIdx--;
        }
        if (startIdx < 0) {
            startIdx = 0;
        }
        let maxB = preCalcB[startIdx];
        for (let i = startIdx; i <= priceIdx; i++) {
            maxB = Math.max(sortedByPrice[i][1], maxB);
            if (preCalcB[i] === 0) {
                preCalcB[i] = maxB;
            }
        }

        qToB.set(q, maxB);
        return maxB;
    });
}

function isMonotonic(nums: number[]): boolean {
    if (nums.length <= 2) {
        return true;
    }

    let sign: 0 | 1 | -1 = 0;
    for (let i = 1; i < nums.length; i++) {
        if (i === 1) {
            sign = signFunc(nums[1] - nums[0]);
        } else {
            if (sign === 0) {
                sign = signFunc(nums[i] - nums[i - 1]);
            } else {
                if (sign * signFunc(nums[i] - nums[i - 1]) === -1) {
                    return false;
                }
            }
        }
    }

    return true;
}

const romanTokens = [
    { token: "IV", value: 4 },
    { token: "IX", value: 9 },
    { token: "XL", value: 40 },
    { token: "XC", value: 90 },
    { token: "CD", value: 400 },
    { token: "CM", value: 900 },
    { token: "I", value: 1 },
    { token: "V", value: 5 },
    { token: "X", value: 10 },
    { token: "L", value: 50 },
    { token: "C", value: 100 },
    { token: "D", value: 500 },
    { token: "M", value: 1000 },
];

function romanToInt(s: string): number {
    let currStr = s;
    let res = 0;
    while (currStr !== "") {
        let tokenFound = false;
        for (const t of romanTokens) {
            if (currStr.startsWith(t.token)) {
                res += t.value;
                tokenFound = true;
                currStr = currStr.slice(t.token.length);
                break;
            }
        }
        if (!tokenFound) {
            return res;
        }
    }
    return res;
}

function findInSortedRight(sortedValues: number[][], value: number): number {
    if (sortedValues.length === 0) {
        return -1;
    }

    let start = 0;
    let end = sortedValues.length - 1;
    if (sortedValues[start][0] > value) {
        return -1;
    }

    if (sortedValues[start][0] === value) {
        while (
            start + 1 < sortedValues.length &&
            sortedValues[start + 1][0] === value
        )
            start++;
        return start;
    }

    if (sortedValues[end][0] <= value) {
        return end;
    }

    do {
        let mid = Math.floor((start + end) / 2);
        if (sortedValues[mid][0] === value) {
            while (
                mid + 1 < sortedValues.length &&
                sortedValues[mid + 1][0] === value
            ) {
                mid++;
            }
            return mid;
        }

        if (sortedValues[mid][0] > value) {
            end = mid;
        } else {
            if (sortedValues[mid + 1][0] > value) {
                return mid;
            }
            start = mid + 1;
        }
    } while (start !== end);

    while (
        start + 1 < sortedValues.length &&
        sortedValues[start + 1][0] === value
    )
        start++;
    return start;
}

function findInSortedLeft(sortedValues: number[][], value: number): number {
    if (sortedValues.length === 0) {
        return -1;
    }
    let start = 0;
    let end = sortedValues.length - 1;
    if (sortedValues[end][0] < value) {
        return -1;
    }

    if (sortedValues[start][0] > value) {
        return start;
    }

    do {
        let mid = Math.floor((start + end) / 2);
        if (sortedValues[mid][0] === value) {
            while (mid - 1 >= 0 && sortedValues[mid - 1][0] === value) {
                mid--;
            }
            return mid;
        }

        if (sortedValues[mid][0] > value) {
            end = mid;
        } else {
            if (sortedValues[mid + 1][0] > value) {
                return mid + 1;
            }
            start = mid + 1;
        }
    } while (start !== end);

    return start;
}

function countFairPairs(nums: number[], lower: number, upper: number): number {
    if (upper < lower || nums.length < 2) {
        return 0;
    }

    const numIdxs = nums.map((n, idx) => [n, idx]).sort((a, b) => a[0] - b[0]);

    if (
        numIdxs[0][0] + numIdxs[1][0] >= lower &&
        numIdxs[numIdxs.length - 1][0] + numIdxs[numIdxs.length - 1][0] <= upper
    ) {
        return ((numIdxs.length - 1) * numIdxs.length) / 2;
    }

    let res = 0;

    for (let i = 0; i < numIdxs.length; i++) {
        const currVal = numIdxs[i][0];
        const currIdx = numIdxs[i][1];
        const i1 = findInSortedLeft(numIdxs, lower - currVal);
        const i2 = findInSortedRight(numIdxs, upper - currVal);

        if (i1 < 0 || i2 < 0 || i2 < i1) {
            continue;
        }

        res += i2 - i1 + 1;
        if (i1 <= i && i <= i2) {
            res--;
        }
    }

    return res / 2;
}

function countFairPairs_(nums: number[], lower: number, upper: number): number {
    if (upper < lower) {
        return 0;
    }

    const allPairs: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] <= upper && nums[i] + nums[j] >= lower) {
                allPairs.push([nums[i] + nums[j], i, j]);
            }
        }
    }

    return allPairs.length;
}

const arr = [-8];

let atomMark: [string] | [string, string] = [] as any as [string];

const MyDiv = document.createElement("div");
MyDiv.textContent = "  ";
document.body.appendChild(MyDiv);

const myBtn = document.createElement("button");
myBtn.textContent = "Calculate";
myBtn.onclick = () => {
    MyDiv.innerHTML = countFairPairs(arr, -7, 20).toString();
};
document.body.appendChild(myBtn);
