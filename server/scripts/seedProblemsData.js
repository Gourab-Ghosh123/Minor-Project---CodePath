const seedData = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    order: 1,
    series: 'Zero to Hero Array Series',
    domainRelevance: ['software-development', 'web-developer', 'data-science', 'beginner'],
    whyImportant: 'The cornerstone of array hash lookup. Used constantly in web backends for ID correlation and in data science for value-pair discovery in O(n) instead of O(n^2).',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Instead of checking every pair with two nested loops (O(n²)), ask yourself: when looking at number X, what exact number Y = (target - X) do I need? A hash map can remember previously seen numbers in O(1) time.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Do NOT use the same element twice! Insert the current number into the hash map AFTER checking if its complement already exists, or ensure you do not return the same index.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. Create an empty map: number -> index.\n2. Loop through nums with index i:\n   a. complement = target - nums[i]\n   b. If complement in map, return [map[complement], i]\n   c. Else map[nums[i]] = i\n3. Return empty array if no pair found.'
      }
    ],
    commonTraps: [
      'Using a nested loop causing Time Limit Exceeded on 10^4 elements',
      'Using the exact same element index twice',
      'Forgetting negative numbers exist in the array'
    ],
    peerTips: [
      {
        author: 'Aman (Frontend Dev)',
        tip: 'Think of the hash map like a shopping list: as you inspect each item, check if its coupon partner is already in your cart!',
        votes: 14
      },
      {
        author: 'Priya (CSE 3rd Year)',
        tip: 'In JavaScript, Map() is faster than plain objects for numeric keys because it avoids string coercion.',
        votes: 8
      }
    ],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        lookup = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in lookup:
                return [lookup[diff], i]
            lookup[num] = i
        return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (mp.find(comp) != mp.end()) {
                return {mp[comp], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
    },
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    topic: 'Arrays',
    difficulty: 'Medium',
    order: 2,
    series: 'Zero to Hero Array Series',
    domainRelevance: ['software-development', 'data-science', 'beginner'],
    whyImportant: 'Kadane algorithm is foundational for time-series financial analysis, stock profit peaks, and dynamic continuous range optimizations.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'At each element, you have two choices: either extend the existing running subarray sum by adding the current number, OR reset and start a brand-new subarray at the current number.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'All numbers can be negative! Initializing your maxSum to 0 will fail if the array is [-5, -2, -8]. Always initialize maxSum to nums[0] or -Infinity.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. max_sum = current_sum = nums[0]\n2. For each num in nums[1:]:\n   a. current_sum = max(num, current_sum + num)\n   b. max_sum = max(max_sum, current_sum)\n3. Return max_sum'
      }
    ],
    commonTraps: [
      'Initializing max_sum to 0 instead of nums[0] (fails when all nums are negative)',
      'Confusing contiguous subarray with non-contiguous subsequence'
    ],
    peerTips: [
      {
        author: 'Rohan (ML Enthusiast)',
        tip: 'Kadane algorithm is essentially a 1D Dynamic Programming table compressed into two simple variables!',
        votes: 11
      }
    ],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum. Kadane's Algorithm allows optimal linear time evaluation.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sum = nums[0]
        cur_sum = nums[0]
        for x in nums[1:]:
            cur_sum = max(x, cur_sum + x)
            max_sum = max(max_sum, cur_sum)
        return max_sum`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = nums[0];
        int cur_sum = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            cur_sum = max(nums[i], cur_sum + nums[i]);
            max_sum = max(max_sum, cur_sum);
        }
        return max_sum;
    }
};`,
    },
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    topic: 'Strings',
    difficulty: 'Easy',
    order: 3,
    series: 'String Pattern Master Series',
    domainRelevance: ['software-development', 'web-developer', 'beginner'],
    whyImportant: 'Core string parsing and sanitation pattern used in search query normalization, input validation, and text NLP processing.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'A palindrome reads the same backwards and forwards. Use two pointers starting at opposite ends (index 0 and index n-1), skipping non-alphanumeric characters.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Remember to ignore case ("A" == "a") and skip spaces and punctuation characters like colons, commas, and dashes.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. Clean string: convert to lowercase and filter [a-z0-9]\n2. left = 0, right = clean.length - 1\n3. While left < right:\n   If clean[left] != clean[right] return false\n   left++, right--\n4. Return true'
      }
    ],
    commonTraps: [
      'Not handling case sensitivity (e.g. uppercase vs lowercase)',
      'Creating multiple intermediate string copies causing unnecessary memory overhead'
    ],
    peerTips: [
      {
        author: 'Kunal (Web Dev)',
        tip: 'In JS, regex `/[^a-z0-9]/gi` cleans the string in a single line before comparing with pointers.',
        votes: 7
      }
    ],
    description: `Given a string \`s\`, return \`true\` if it is a palindrome after removing non-alphanumeric characters and converting uppercase to lowercase.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    starterCode: {
      javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        clean = [c.lower() for c in s if c.isalnum()]
        return clean == clean[::-1]`,
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`,
    },
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    topic: 'Strings',
    difficulty: 'Easy',
    order: 4,
    series: 'String Pattern Master Series',
    domainRelevance: ['software-development', 'web-developer', 'beginner'],
    whyImportant: 'Teaches frequency counters / hash tables for character matching, autocomplete indexing, and word permutations.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Two strings are anagrams if every letter appears the exact same number of times in both. Check lengths first; if lengths differ, they cannot be anagrams.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Sorting both strings takes O(n log n). A frequency count array of size 26 or a hash map solves it in linear O(n) time and O(1) extra space!'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. If s.length != t.length return false\n2. Count array count[26] = 0\n3. For each char in s, increment count; for each in t, decrement count\n4. If any count != 0, return false, else true'
      }
    ],
    commonTraps: [
      'Assuming characters are always lowercase English without checking constraints',
      'Forgetting early exit when lengths differ'
    ],
    peerTips: [
      {
        author: 'Neha (Data Analyst)',
        tip: 'In Python, `collections.Counter(s) == collections.Counter(t)` is super clean and idiomatic!',
        votes: 9
      }
    ],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true',
        explanation: 'Letters match character counts.',
      },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let c of s) count[c] = (count[c] || 0) + 1;
  for (let c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        from collections import Counter
        return Counter(s) == Counter(t)`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        for (char c : t) {
            count[c - 'a']--;
            if (count[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
    },
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    topic: 'Two Pointers',
    difficulty: 'Medium',
    order: 5,
    series: 'Pointers & Window Battle Series',
    domainRelevance: ['software-development', 'data-science'],
    whyImportant: 'The quintessential two-pointer optimization problem. Teaches greedy choice property without having to check every pair.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Area = width * min(height[left], height[right]). Start with max width (pointers at edges). To have any chance of finding a larger area as width shrinks, you must move the shorter line inward!'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Moving the taller pointer will always result in equal or smaller area because width decreases and height cannot exceed the shorter line.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. left = 0, right = n - 1, max_water = 0\n2. While left < right:\n   water = min(height[left], height[right]) * (right - left)\n   max_water = max(max_water, water)\n   If height[left] < height[right] left++ else right--\n3. Return max_water'
      }
    ],
    commonTraps: [
      'Moving both pointers at once',
      'Using an O(n^2) nested loop that times out on 10^5 elements'
    ],
    peerTips: [
      {
        author: 'Arjun (Backend SDE)',
        tip: 'Always ask: which variable is currently the bottleneck? The shorter vertical line is the bottleneck, so eliminate it!',
        votes: 12
      }
    ],
    description: `Given \`n\` non-negative integers \`a1, a2, ..., an\`, where each represents a point at coordinate \`(i, ai)\`. Find two lines that form a container storing the maximum water.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'Max area between index 1 and 8.',
      },
    ],
    constraints: ['2 <= height.length <= 10^5'],
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const width = right - left;
    const current = Math.min(height[left], height[right]) * width;
    maxWater = Math.max(maxWater, current);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        ans = 0
        while l < r:
            ans = max(ans, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return ans`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int max_w = 0;
        while (l < r) {
            max_w = max(max_w, (int)min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return max_w;
    }
};`,
    },
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    order: 6,
    series: 'Pointers & Window Battle Series',
    domainRelevance: ['software-development', 'web-developer'],
    whyImportant: 'Sliding window with dynamic resizing is key for streaming data, token parsing, and network traffic window calculations.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Use a sliding window [left, right]. Expand `right` to include characters. When you see a duplicate, shrink `left` just enough so all characters in window are unique.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'When jumping `left` with a hash map, ensure you do not move `left` backwards! Use `left = Math.max(left, map[char] + 1)`.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. map = {}, left = 0, max_len = 0\n2. For right from 0 to n-1:\n   If s[right] in map: left = max(left, map[s[right]] + 1)\n   map[s[right]] = right\n   max_len = max(max_len, right - left + 1)\n3. Return max_len'
      }
    ],
    commonTraps: [
      'Moving left pointer backwards when encountering duplicate outside current window',
      'Empty string returning 1 instead of 0'
    ],
    peerTips: [
      {
        author: 'Siddharth (Fullstack)',
        tip: 'Visualize the window like a caterpillar crawling: right foot expands, left foot contracts when stuck on duplicates!',
        votes: 15
      }
    ],
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with length 3.',
      },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let map = new Map();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in char_map:
                left = max(left, char_map[char] + 1)
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> last(256, -1);
        int max_len = 0, start = -1;
        for (int i = 0; i < s.size(); i++) {
            if (last[(unsigned char)s[i]] > start)
                start = last[(unsigned char)s[i]];
            last[(unsigned char)s[i]] = i;
            max_len = max(max_len, i - start);
        }
        return max_len;
    }
};`,
    },
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    topic: 'Linked List',
    difficulty: 'Easy',
    order: 7,
    series: 'Core Linear Structures Series',
    domainRelevance: ['software-development', 'beginner'],
    whyImportant: 'Pointer manipulation benchmark. Teaches memory traversal and temporal variable swapping without loss of references.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'You need three pointers: `prev` (starts null), `curr` (starts at head), and `nextTemp` (stores curr.next before reversing).'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'If you overwrite `curr.next = prev` before saving `curr.next`, you lose the rest of the list forever!'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. prev = null, curr = head\n2. While curr != null:\n   next = curr.next\n   curr.next = prev\n   prev = curr\n   curr = next\n3. Return prev (new head)'
      }
    ],
    commonTraps: [
      'Null pointer dereference on empty list (head === null)',
      'Losing reference to the rest of the list by assigning curr.next too early'
    ],
    peerTips: [
      {
        author: 'Meera (SDE Intern)',
        tip: 'Draw the 3 pointers on a notebook! Moving prev, curr, next step-by-step makes the code write itself.',
        votes: 18
      }
    ],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'Pointers reversed.',
      },
    ],
    constraints: ['0 <= node count <= 5000'],
    starterCode: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
    },
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    order: 8,
    series: 'Core Linear Structures Series',
    domainRelevance: ['software-development', 'web-developer', 'beginner'],
    whyImportant: 'Core LIFO pattern used in compiler grammar parsers, JSON parsing, HTML tag pairing, and IDE syntax highlighting.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Whenever you see an opening bracket `( { [`, push it onto a stack. When you see a closing bracket, the top of the stack MUST be its matching opener.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Check for empty stack before popping! String like `"]"` or `"("` must be handled properly.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. stack = []\n2. For each char in s:\n   If opener: stack.push(char)\n   If closer: if stack is empty or top doesn\'t match, return false\n3. Return stack.length === 0'
      }
    ],
    commonTraps: [
      'Popping from an empty stack when first char is a closing bracket',
      'Forgetting that leftover unclosed brackets at the end mean false'
    ],
    peerTips: [
      {
        author: 'Vivek (Compilers)',
        tip: 'Map closing brackets to their open counterparts in an object: `map = {\')\': \'(\', \'}\': \'{\', \']\': \'[\'}`.',
        votes: 13
      }
    ],
    description: `Given a string \`s\` containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'Balanced correctly.',
      },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let c of s) {
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', '}': '{', ']': '['}
        for c in s:
            if c in pairs.values():
                stack.append(c)
            elif c in pairs:
                if not stack or stack.pop() != pairs[c]:
                    return False
        return len(stack) == 0`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    },
  },
  {
    title: 'Implement Queue using Stacks',
    slug: 'implement-queue-using-stacks',
    topic: 'Queue',
    difficulty: 'Easy',
    order: 9,
    series: 'Core Linear Structures Series',
    domainRelevance: ['software-development', 'web-developer'],
    whyImportant: 'Demonstrates converting LIFO behavior to FIFO behavior using amortized O(1) two-stack shifting, critical in event queues.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Use two stacks: `inStack` for push operations, and `outStack` for pop/peek operations. When outStack is empty, pour all elements from inStack into outStack to reverse their order!'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Do NOT pour from inStack to outStack on every operation. Only pour when outStack is empty. This gives amortized O(1) performance.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. push(x): inStack.push(x)\n2. pop(): if outStack empty, transfer all from inStack; return outStack.pop()\n3. peek(): if outStack empty, transfer all; return outStack.top()\n4. empty(): return inStack.empty() && outStack.empty()'
      }
    ],
    commonTraps: [
      'Transferring between stacks on every push making push O(n)',
      'Forgetting that peek also requires the same transfer as pop'
    ],
    peerTips: [
      {
        author: 'Ananya (Web Dev)',
        tip: 'This is the exact principle behind event queues buffered by write-stacks in Node.js microservices!',
        votes: 10
      }
    ],
    description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`peek\`, \`pop\`, and \`empty\`).`,
    examples: [
      {
        input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
        output: '[null, null, null, 1, 1, false]',
        explanation: 'Standard FIFO queue execution.',
      },
    ],
    constraints: ['1 <= x <= 9', 'At most 100 calls to push, pop, peek, empty.'],
    starterCode: {
      javascript: `class MyQueue {
  constructor() {
    this.in = [];
    this.out = [];
  }
  push(x) {
    this.in.push(x);
  }
  pop() {
    this.peek();
    return this.out.pop();
  }
  peek() {
    if (this.out.length === 0) {
      while (this.in.length > 0) {
        this.out.push(this.in.pop());
      }
    }
    return this.out[this.out.length - 1];
  }
  empty() {
    return this.in.length === 0 && this.out.length === 0;
  }
}`,
      python: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack`,
      cpp: `#include <stack>
using namespace std;

class MyQueue {
    stack<int> in_st, out_st;
public:
    void push(int x) { in_st.push(x); }
    int pop() {
        peek();
        int val = out_st.top();
        out_st.pop();
        return val;
    }
    int peek() {
        if (out_st.empty()) {
            while (!in_st.empty()) {
                out_st.push(in_st.top());
                in_st.pop();
            }
        }
        return out_st.top();
    }
    bool empty() { return in_st.empty() && out_st.empty(); }
};`,
    },
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    topic: 'Binary Search',
    difficulty: 'Easy',
    order: 10,
    series: 'Binary Search Mastery Series',
    domainRelevance: ['software-development', 'data-science', 'beginner'],
    whyImportant: 'Fundamental logarithmic search divide-and-conquer strategy, slashing search spaces from 1,000,000 elements to ~20 comparisons.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Since the array is already sorted, comparing target with the middle element immediately rules out half of the entire remaining array.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'To prevent integer overflow in C++/Java, compute `mid = left + Math.floor((right - left) / 2)` rather than `(left + right) / 2`. Keep condition `left <= right`.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. left = 0, right = nums.length - 1\n2. While left <= right:\n   mid = left + (right - left) // 2\n   If nums[mid] == target: return mid\n   If nums[mid] < target: left = mid + 1\n   Else right = mid - 1\n3. Return -1'
      }
    ],
    commonTraps: [
      'Using left < right instead of left <= right (misses single-element search)',
      'Not updating left = mid + 1 or right = mid - 1 causing infinite loop'
    ],
    peerTips: [
      {
        author: 'Deepak (Competitive Coder)',
        tip: 'Remember: whenever a question mentions "sorted array" or "search space with monotonic answer", think Binary Search immediately!',
        votes: 19
      }
    ],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, search \`target\` in \`nums\` with O(log n) complexity.`,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: 'Found at index 4.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order.'],
    starterCode: {
      javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                l = mid + 1
            else:
                r = mid - 1
        return -1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
};`,
    },
  },
  {
    title: 'Search Insert Position',
    slug: 'search-insert-position',
    topic: 'Binary Search',
    difficulty: 'Easy',
    order: 11,
    series: 'Binary Search Mastery Series',
    domainRelevance: ['software-development', 'data-science', 'beginner'],
    whyImportant: 'Teaches lower-bound search and where new items should be placed in sorted collections like database B-Trees.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Standard binary search, but if the element is not found, the `left` pointer will end up pointing directly at the exact index where it should be inserted!'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'When the loop terminates with `left > right`, returning `left` is the correct insertion index.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. left = 0, right = nums.length - 1\n2. While left <= right:\n   mid = (left + right) // 2\n   If nums[mid] == target: return mid\n   If nums[mid] < target: left = mid + 1\n   Else right = mid - 1\n3. Return left'
      }
    ],
    commonTraps: [
      'Returning mid instead of left when target is not found',
      'Off-by-one when target is larger than all elements'
    ],
    peerTips: [
      {
        author: 'Rashi (Data Science)',
        tip: 'In Python, `bisect_left` performs this exact logic in C-level performance!',
        votes: 7
      }
    ],
    description: `Given a sorted array of distinct integers and a target value, return the index if target is found or where it would be inserted.`,
    examples: [
      {
        input: 'nums = [1,3,5,6], target = 5',
        output: '2',
        explanation: 'Found at index 2.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    starterCode: {
      javascript: `function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}`,
      python: `class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                l = mid + 1
            else:
                r = mid - 1
        return l`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return l;
    }
};`,
    },
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    topic: 'Binary Search',
    difficulty: 'Medium',
    order: 12,
    series: 'Binary Search Mastery Series',
    domainRelevance: ['software-development', 'data-science'],
    whyImportant: 'Classic interview favorite testing logic branching: determining which half of the array remains sorted and adjusting search boundaries.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Even when rotated, at least ONE half (left to mid, or mid to right) is ALWAYS strictly sorted. Identify which half is sorted first!'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Check if target lies inside the sorted half with `<=`. If it does, narrow search to that half; otherwise search the other half.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. If nums[l] <= nums[mid]: left half is sorted.\n   Check if nums[l] <= target < nums[mid]: r = mid - 1, else l = mid + 1\n2. Else right half is sorted.\n   Check if nums[mid] < target <= nums[r]: l = mid + 1, else r = mid - 1'
      }
    ],
    commonTraps: [
      'Using strict < instead of <= when comparing boundary values with target',
      'Assuming the entire array is sorted'
    ],
    peerTips: [
      {
        author: 'Harsh (FAANG Aspirant)',
        tip: 'Draw a rotated mountain graph: one slope is always unbroken! Check if your target falls on that clean slope.',
        votes: 16
      }
    ],
    description: `Given a rotated sorted array and a target, find the target index in O(log n) time.`,
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
        explanation: '0 is found at index 4.',
      },
    ],
    constraints: ['1 <= nums.length <= 5000'],
    starterCode: {
      javascript: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return -1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
};`,
    },
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    topic: 'Trees',
    difficulty: 'Easy',
    order: 13,
    series: 'Hierarchical Tree Explorer Series',
    domainRelevance: ['software-development', 'web-developer', 'data-science', 'beginner'],
    whyImportant: 'The "Hello World" of tree recursion and depth-first search (DFS). Underpins DOM tree rendering and ML decision tree depths.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'The depth of a tree rooted at node is 1 + maximum of depth of its left subtree and depth of its right subtree. If root is null, depth is 0.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Base case is essential: `if (!root) return 0;`. Missing this causes infinite call stack overflow.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. If root is null, return 0\n2. leftDepth = maxDepth(root.left)\n3. rightDepth = maxDepth(root.right)\n4. Return 1 + max(leftDepth, rightDepth)'
      }
    ],
    commonTraps: [
      'Missing base case causing Call Stack Exceeded',
      'Adding 1 to both left and right instead of taking max'
    ],
    peerTips: [
      {
        author: 'Tanvi (Frontend Architect)',
        tip: 'In web dev, calculating DOM component nesting depth uses this identical recursive traversal!',
        votes: 14
      }
    ],
    description: `Given the \`root\` of a binary tree, return its maximum depth.`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3',
        explanation: 'Longest path from root has 3 nodes.',
      },
    ],
    constraints: ['0 <= Node count <= 10^4'],
    starterCode: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    },
  },
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    topic: 'Trees',
    difficulty: 'Easy',
    order: 14,
    series: 'Hierarchical Tree Explorer Series',
    domainRelevance: ['software-development', 'web-developer', 'beginner'],
    whyImportant: 'Famous tree mirror challenge. Teaches swapping references during depth traversal without losing subtree children.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'For every node, swap its left child and right child, then recursively invert both subtrees.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Make sure to store one child in a temporary variable before overwriting, or swap them simultaneously!'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. If root is null, return null\n2. temp = root.left\n3. root.left = invertTree(root.right)\n4. root.right = invertTree(temp)\n5. Return root'
      }
    ],
    commonTraps: [
      'Overwriting root.left with inverted right, then inverting the already overwritten child'
    ],
    peerTips: [
      {
        author: 'Karan (Junior Dev)',
        tip: 'In Python: `root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)` swaps in one clean line!',
        votes: 21
      }
    ],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.`,
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]',
        explanation: 'All left and right subtrees are inverted.',
      },
    ],
    constraints: ['0 <= node count <= 100'],
    starterCode: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      python: `class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};`,
    },
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    topic: 'Graphs',
    difficulty: 'Medium',
    order: 15,
    series: 'Hierarchical Tree Explorer Series',
    domainRelevance: ['software-development', 'data-science', 'web-developer'],
    whyImportant: 'The hallmark matrix grid traversal problem using 2D BFS/DFS, foundational for image segmentation, network clusters, and game maps.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'Iterate through every cell. Whenever you find a \'1\' (land), increment island count and sink the entire connected landmass to \'0\' using DFS/BFS in 4 directions.'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Check grid boundaries (r < 0, c < 0, r >= rows, c >= cols) and whether cell is \'0\' before recursing.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. islands = 0\n2. For r in rows, c in cols:\n   If grid[r][c] == \'1\':\n     islands++\n     sink(r, c) // marks 4 adjacent neighbors to \'0\'\n3. Return islands'
      }
    ],
    commonTraps: [
      'Infinite recursion from forgetting to mark visited cells as \'0\'',
      'Checking out-of-bound grid indices without bounds guard'
    ],
    peerTips: [
      {
        author: 'Suman (Game Dev & AI)',
        tip: 'Sinking land directly in the grid avoids keeping a separate visited set, keeping space O(1) beyond the call stack!',
        votes: 17
      }
    ],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.`,
    examples: [
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: '3',
        explanation: 'There are 3 separate connected components of land.',
      },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'],
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
                return
            grid[r][c] = '0'
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int rows = grid.size(), cols = grid[0].size(), count = 0;
        auto dfs = [&](auto& self, int r, int c) -> void {
            if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == '0') return;
            grid[r][c] = '0';
            self(self, r+1, c); self(self, r-1, c);
            self(self, r, c+1); self(self, r, c-1);
        };
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(dfs, r, c);
                }
            }
        }
        return count;
    }
};`,
    },
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    order: 16,
    series: 'Dynamic Programming Decoded Series',
    domainRelevance: ['software-development', 'data-science', 'beginner'],
    whyImportant: 'The golden entry-gate to Dynamic Programming. Proves how overlapping subproblems reduce exponential recursion to simple O(n) tabulation.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'To reach step N, you could have come from step (N-1) by taking 1 step, or from step (N-2) by taking 2 steps. Therefore: ways(N) = ways(N-1) + ways(N-2). It\'s Fibonacci!'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Plain recursion `climb(n-1) + climb(n-2)` takes O(2^n) exponential time and will time out. Store previous two values to achieve O(n) time and O(1) space.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. If n <= 2 return n\n2. prev2 = 1, prev1 = 2\n3. For i from 3 to n:\n   current = prev1 + prev2\n   prev2 = prev1, prev1 = current\n4. Return prev1'
      }
    ],
    commonTraps: [
      'Unmemoized recursion causing Time Limit Exceeded',
      'Off-by-one with base cases when n = 1 or n = 2'
    ],
    peerTips: [
      {
        author: 'Ayush (IIT Roorkee)',
        tip: 'Whenever an algorithm question asks "number of ways to achieve target", think DP recurrence relation!',
        votes: 25
      }
    ],
    description: `You are climbing a staircase with \`n\` steps. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?`,
    examples: [
      {
        input: 'n = 3',
        output: '3',
        explanation: '3 ways: (1+1+1), (1+2), (2+1)',
      },
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `#include <vector>
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
    },
  },
  {
    title: 'House Robber',
    slug: 'house-robber',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    order: 17,
    series: 'Dynamic Programming Decoded Series',
    domainRelevance: ['software-development', 'data-science'],
    whyImportant: 'Teaches non-adjacent state selection decisions (rob vs skip), a key optimization in resource allocation and portfolio selection.',
    hints: [
      {
        level: 1,
        title: '💡 Intuition & Mental Model',
        content: 'At house `i`, you have two choices: rob house `i` (adding its cash to max loot from house `i-2`), or skip house `i` (retaining max loot up to house `i-1`).'
      },
      {
        level: 2,
        title: '⚠️ Common Traps & Edge Cases',
        content: 'Single house or two houses arrays: handle boundaries cleanly with `max(rob1 + n, rob2)`.'
      },
      {
        level: 3,
        title: '📝 Step-by-Step Pseudo-code',
        content: '1. rob1 = 0, rob2 = 0\n2. For each num in nums:\n   temp = max(num + rob1, rob2)\n   rob1 = rob2\n   rob2 = temp\n3. Return rob2'
      }
    ],
    commonTraps: [
      'Allocating large dp arrays when only 2 rolling variables are needed',
      'Forgetting that you can skip two houses if optimal'
    ],
    peerTips: [
      {
        author: 'Naveen (Competitive Coder)',
        tip: 'The formula is `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`. Two variables are all you need!',
        votes: 12
      }
    ],
    description: `Given an integer array \`nums\` representing cash in houses, return max money you can rob without triggering alarms in adjacent houses.`,
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '4',
        explanation: 'Rob house 1 and 3 = 4.',
      },
    ],
    constraints: ['1 <= nums.length <= 100'],
    starterCode: {
      javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (let n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`,
      python: `class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            rob1, rob2 = rob2, max(n + rob1, rob2)
        return rob2`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = max(n + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
};`,
    },
  },
];

module.exports = { seedData };
