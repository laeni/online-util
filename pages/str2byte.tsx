import { Button, Input, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/layout';

interface DataType {
    char: string;
    [key: string]: string | string[];
}

interface PerseChar {
    /** Unicode. */
    unicode: string;
    /** Unicode 十进制. */
    unicode10: string;
    /** Unicode 二进制. */
    unicode2: string;
    /** UTF-8 二进制编码. */
    utf8_2: string[];
    /** UTF-8 Uint8(无符号). */
    utf8Uint8: string[];
    /** UTF-8 二进制补码. */
    utf8int8Bin: string[];
    /** UTF-8 Byte(带符号). */
    utf8Int8: string[];
    /** UTF-16 二进制编码. */
    utf16_2: string;
}

export default function Str2BytePage() {
    const [chars, setChars] = useState<string[]>([]);

    // 根据输入字符动态生成表格标题
    const columns: ColumnsType<DataType> = [
        {
            title: '字符',
            dataIndex: 'char',
            key: 'char',
            fixed: 'left',
        }
    ];
    chars.forEach((char, i) => columns.push({
        title: char,
        dataIndex: 'i' + i,
        key: 'i' + i,
        render: v => {
            if (typeof v === 'string') {
                return v;
            } else {
                return (
                    <div className='flex'>
                        {(v as string[]).map((it, i) => (
                            <div key={i} className='px-1 grow'>{it}</div>
                        ))}
                    </div>
                )
            }
        }
    }));

    const perses: PerseChar[] = chars.map(char => {
        const charCode = char.charCodeAt(0);
        const utf8_2 = toUtf8Str(char);
        const utf8Uint8 = utf8_2.map(bin => parseInt(bin, 2).toString());
        const utf8int8Bin = utf8_2.map(bin => toSuorce(bin));
        const utf8Int8 = utf8int8Bin.map(bin => (bin[0] === '0' ? '' : '-') + parseInt(bin.substring(1), 2).toString());
        const utf16_2 = toUtf16Str(char);

        return {
            unicode: '\\u' + charCode.toString(16),
            unicode10: charCode.toString(),
            unicode2: charCode.toString(2),
            utf8_2,
            utf8Uint8,
            utf8int8Bin,
            utf8Int8,
            utf16_2,
        };
    });

    const data: DataType[] = [];
    // Unicode
    {
        const dt: DataType = { key: '1', char: 'Unicode' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].unicode);
        data.push(dt);
    }
    // Unicode 十进制
    {
        const dt: DataType = { key: '2', char: 'Unicode 十进制' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].unicode10);
        data.push(dt);
    }
    // Unicode 二进制
    {
        const dt: DataType = { key: '3', char: 'Unicode 二进制' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].unicode2);
        data.push(dt);
    }
    // UTF-8 二进制编码
    {
        const dt: DataType = { key: '4', char: 'UTF-8 二进制编码' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].utf8_2);
        data.push(dt);
    }
    // UTF-8 Uint8(Golang)
    {
        const dt: DataType = { key: '5', char: 'UTF-8 Uint8(无符号)' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].utf8Uint8);
        data.push(dt);
    }
    // UTF-8 二进制原码
    {
        const dt: DataType = { key: '6', char: 'UTF-8 Byte(带符号)补码' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].utf8int8Bin);
        data.push(dt);
    }
    // UTF-8 Byte(Java)
    {
        const dt: DataType = { key: '7', char: 'UTF-8 Byte(带符号)' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].utf8Int8);
        data.push(dt);
    }
    // UTF-16 二进制编码
    {
        const dt: DataType = { key: '8', char: 'UTF-16 二进制编码' };
        chars.forEach((_, i) => dt['i' + i] = perses[i].utf16_2);
        data.push(dt);
    }
    // UTF-32 二进制编码
    {
        const dt: DataType = { key: '8', char: 'UTF-32 二进制编码' };
        // 由于目前 UTF-16 只支持 \uFFFF 以下字符，所以 UTF-32 只需要前面补 0 即可 
        chars.forEach((_, i) => dt['i' + i] = repeatChar('0', 16) + perses[i].utf16_2);
        data.push(dt);
    }

    return (
        <>
            <Head>
                <title>在线文本转二进制</title>
            </Head>

            <Layout>
                <div className='md:container mx-auto min-h-[calc(100vh-68px)] bg-white pt-4 md:pt-8 px-4 md:px-8 h-full'>
                    <h1>在线文本转换为二进制</h1>
                    <div className='px-2 sm:px-4 md:px-8'>
                        <p className='text-lg'>
                            本工具采用 UTF （Unicode Transformation Format，Unicode转换格式） 编码方式将字符串转换为无符号二进制（如Golang中的Byte）和带符号二进制（如Java中的Byte），
                            并给出详细的转换过程，目的主要用于学习 UTF 编码规则。为了简单起见，不支持大于 <code>0xFFFF</code> 的字符。</p>

                        <div className='px-2 sm:px-12 md:px-20 lg:px-28 xl:px-36 pt-4 md:pt-8'>
                            <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 3 }}
                                placeholder="请输入需要转换的字符串..."
                                showCount maxLength={100}
                                size="large"
                                // 为了简单起见，不支持大于 0x10000 的字符
                                onChange={v => setChars(v.target.value ? v.target.value.split('').filter(c => c.charCodeAt(0) <= 0xFFFF) : [])}
                            />
                        </div>

                        <div className="pt-12 pb-8 px-0 sm:px-4">
                            <Table className='lg:hidden' size='small' columns={columns} dataSource={chars.length === 0 ? [] : data} scroll={{ x: 'max-content' }} pagination={false} />
                            <Table className='hidden lg:block 2xl:hidden' size='middle' columns={columns} dataSource={chars.length === 0 ? [] : data} scroll={{ x: 'max-content' }} pagination={false} />
                            <Table className='hidden 2xl:block' size='large' columns={columns} dataSource={chars.length === 0 ? [] : data} scroll={{ x: 'max-content' }} pagination={false} />
                        </div>
                    </div>

                    {/* 相关工具 */}
                    <div className='pb-4'>
                        <h2>相关工具</h2>
                        <div className='flex flex-wrap'>
                            <div className='px-4'><a href="https://tool.oschina.net/hexconvert/" target='_blank' rel="noreferrer">在线进制转换</a></div>
                            <div className='px-4'><a href="https://unicode.yunser.com/unicode" target='_blank' rel="noreferrer">Unicode查询</a></div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className='pb-4'>
                        <h2>FAQ</h2>
                        <div className='flex flex-wrap'>
                            <Popover
                                content={(
                                    <ol className='pl-4 w-72 sm:w-96 lg:w-[36rem]'>
                                        <li>恰恰相反，是先有 UTF-16 和 UTF-32 ，再有 UTF-8。而“8”、“16”和“32”表示的不是版本，而是编码的单位，即 UTF-8 以一个字节（8位）为一个编码单位进行编码，
                                        最大可以使用4字节；UTF-16 每2个字节（16位）为一个编码单位，最大也是4字节；UTF-32 则全部使用定长的4字节编码所有字符。</li>
                                        <li>之所以出现 UTF-8 是因为 UTF-16 和 UTF-32 虽然解析速度不错，但是弊端很大，比如 UTF-16 中超过 <code>0xFFFF</code> 的字符编码时有大端序和大端序之分，
                                        编码比较麻烦，需要采用 BOM 声明或者提前约定好（这也是本工具暂时不支持超过 <code>0xFFFF</code> 字符的原因），并且部分 Unicode 字符无法使用 UTF-16 进行编码；
                                        而 UTF-32 虽然不存在上述问题，但是常用字符一般只占用 1 ～ 2 字节，UTF-32 就会非常浪费空间。</li>
                                    </ol>
                                )}
                            >
                                <Button type='link'>UTF-16 和 UTF-32 是 UTF-8 的升级版吗？</Button>
                            </Popover>
                            <Popover
                                content={(
                                    <ol className='pl-4 w-72 sm:w-96 lg:w-[36rem]'>
                                        <li>目前公认的最大Unicode字符的编码为“<code>\u10FFFF</code>”（占用21位），按照目前 UTF-8 的最多占用4字节的编码规则，
                                        UTF-8最多可以编码 <code>2^21 = 2097152</code> 个字符，对应二进制为：<code>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</code>，
                                        剩余容量为：<code>2^21 - 0x10FFFF = 983041</code>。</li>
                                        <li>然而“最多4字节”这个规定是目前最大 Unicode 码点决定的，假如 Unicode 继续无限扩展下去，按照 UTF-8 的组成规则，
                                        最多可以编码 <code>2^36 = 68719476736</code> 个字符，对应二进制为：<code>11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx</code>。</li>
                                    </ol>
                                )}
                            >
                                <Button type='link'>UTF-8 会有不够用的一天吗？</Button>
                            </Popover>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

/** 求二进制数（补码）的原码. */
function toSuorce(num: string): string {
    // 正数的补码和原码相同
    if (num[0] === '0') {
        return num;
    }
    // 补码中最后一个 1 所在的索引
    let li: number = num.length - 1;
    for (; li >= 0; li--) {
        if (num[li] === '1') {
            break;
        }
    }
    // 将第一个 1 和最后一个 1 之间的部分取反
    const s = num.split('');
    for (let i = 1; i < li; i++) {
        s[i] = s[i] === '1' ? '0' : '1';
    }

    return s.join('');
}
/** 将一个字符转换为 UTF-8 编码的二进制格式. */
function toUtf8Str(char: string): string[] {
    // 二进制
    const binStr = char.charCodeAt(0).toString(2);
    // UTF-8 字节数
    const btNum = utf8ByteNum(char);
    if (btNum === 1) {
        return [repeatChar('0', 8 - binStr.length) + binStr];
    } else {
        const utf8Arr: string[] = [];
        // 第一字节
        let next = binStr.length - (btNum - 1) * 6;
        const b1 = binStr.substring(0, next)
        utf8Arr[0] = repeatChar('1', btNum) + repeatChar('0', 8 - btNum - b1.length) + b1;
        // 非第一字节
        for (let j = 1; j < btNum; j++) {
            utf8Arr[j] = '10' + binStr.substring(next, next = next + 6)
        }
        return utf8Arr;
    }
}
/** 计算 UTF-8 编码后的字节数 */
function utf8ByteNum(char: string): number {
    const charCode = char.charCodeAt(0);
    // 0xxxxxxx
    if (charCode <= 0x7f) {
        return 1;
    }
    // 110xxxxx 10xxxxxx
    else if (charCode <= 0x7ff) {
        return 2;
    }
    // 1110xxxx 10xxxxxx 10xxxxxx
    else if (charCode <= 0xffff) {
        return 3;
    } else {
        return 4;
    }
}
/** 将一个字符转换为 UTF-16 编码的二进制格式. */
function toUtf16Str(char: string): string {
    // 二进制
    const charCode = char.charCodeAt(0);
    const hexStr = charCode.toString(2);
    return repeatChar('0', 16 - hexStr.length) + hexStr;
}
/** 将字符串 c 重复 n 次. */
function repeatChar(c: string, n: number): string {
    let t = c;
    for (let i = 1; i < n; i++) {
        t += c;
    }
    return t;
}
