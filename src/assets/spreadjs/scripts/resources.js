var uiResource = {
    toolBar: {
        zoom: {
            title: "Zoom",
            zoomOption: {
                twentyFivePercentSize: "25%",
                fiftyPercentSize: "50%",
                seventyFivePercentSize: "75%",
                defaultSize: "100%",
                oneHundredTwentyFivePercentSize: "125%",
                oneHundredFiftyPercentSize: "150%",
                twoHundredPercentSize: "200%",
                threeHundredPercentSize: "300%",
                fourHundredPercentSize: "400%"
            }
        },
        clear: {
            title: "清除",
            clearActions: {
                clearAll: "清除所有",
                clearFormat: "清除格式"
            }
        },
        doLoad: {
            title: "加载数据"
        },

        doPreserve: {
            title: "保存模板"
        },
        export: {
            title: "保存文档",
            exportActions: {
                exportJson: "保存为JSON",
                exportExcel: "保存为Excel"
            }
        },
        downloadTitle: "保存文档",
        download: "Right Click To Download Linked File As...",
        showInspector: "显示工具栏",
        hideInspector: "隐藏工具栏",
        importJson: "加载JSON",
        importFile: "文档管理",
        insertTable: "插入表格",
        insertPicture: "插入图片",
        insertComment: "插入批注",
        confirm : "确认",
        cancelConfirmation :"取消确认",
        insertSparkline: "插入图表",
        insertChart: "插入Chart",
        insertSlicer: "插入切片器",
        insertShape: "Insert Shape"
    },
    tabs: {
    	 spread: "拓展",
         sheet: "表格参数",
         cell: "单元格",
         table: "表格样式",
         tableData: "模板设计",
        data: "Data",
        comment: "Comment",
        picture: "Picture",
        sparklineEx: "Sparkline",
        chartEx: "Chart",
        shapeEx: "Shape",
        slicer: "Slicer"
    },
    spreadTab: {
        general: {
            title: "常规",
            allowDragDrop: "允许拖放",
            allowDragFill: "允许拖动和填充",
            allowZoom: "允许缩放",
            allowOverflow: "允许溢出",
            showDragFillSmartTag: "显示拖动填充智能标记",
            allowDragMerge: "允许拖动和合并",
            allowContextMenu: "允许上下文菜单",
            allowUserDeselect: "允许用户取消选择"
        },
        calculation: {
            title: "计算",
            referenceStyle: {
                title: "行号列标表示",
                r1c1: "R1C1",
                a1: "A1"
            }
        },
        scrollBar: {
            title: "滚动条",
            showVertical: "垂直滚动条",
            showHorizontal: "水平滚动条",
            maxAlign: "滚动条最大对齐",
            showMax: "滚动条显示最大值",
            scrollIgnoreHidden: "滚动忽略隐藏行或列"
        },
        tabStip: {
            title: "选项卡",
            visible: "选项卡可见",
            newTabVisible: "新选项卡可见",
            editable: "选项卡可编辑",
            showTabNavigation: "显示选项卡导航"
        },
        color: {
            title: "颜色",
            spreadBackcolor: "Spread背景色",
            grayAreaBackcolor: "灰色区域背景色"
        },
        tip: {
            title: "提示",
            showDragDropTip: "显示拖放提示",
            showDragFillTip: "显示拖动填充提示",
            scrollTip: {
                title: "顶端提示",
                values: {
                    none: "None",
                    horizontal: "Horizontal",
                    vertical: "Vertical",
                    both: "Both"
                }
            },
            resizeTip: {
                title: "调整提示大小",
                values: {
                    none: "None",
                    column: "Column",
                    row: "Row",
                    both: "Both"
                }
            }
        },
        sheets: {
            title: "工作表",
            sheetName: "工作表名称",
            sheetVisible: "工作表是否可见"
        },
        cutCopy: {
            title: "剪切 / 复制",
            cutCopyIndicator: {
                visible: "显示指示器",
                borderColor: "指示器边框颜色"
            },
            allowCopyPasteExcelStyle: "允许复制粘贴Excel样式",
            allowExtendPasteRange: "允许扩展粘贴范围",
            copyPasteHeaderOptions: {
                title: "标题选项",
                option: {
                    noHeaders: "无表头",
                    rowHeaders: "行表头",
                    columnHeaders: "列表头",
                    allHeaders: "所有表头"
                }
            }
        },
        spreadTheme: {
            title: "Spread主题",
            theme: {
                title: "主题",
                option: {
                    spreadJS: "SpreadJS",
                    excel2013White: "Excel2013 White",
                    excel2013LightGray: "Excel2013 Light Gray",
                    excel2013DarkGray: "Excel2013 Dark Gray",
                    excel2016Colorful: "Excel2016 Colorful",
                    excel2016DarkGray: "Excel2016 Dark Gray"
                }
            }
        },
        resizeZeroIndicator: {
            title: "尺寸指示器",
            option: {
                defaultValue: "Default",
                enhanced: "Enhanced"
            }
        }
    },
    sheetTab: {
        general: {
            title: "总的",
            rowCount: "行",
            columnCount: "列",
            name: "名称",
            tabColor: "工作表标签颜色"
        },
        freeze: {
            title: "定格",
            frozenRowCount: "标题行",
            frozenColumnCount: "标题列",
            trailingFrozenRowCount: "页脚行",
            trailingFrozenColumnCount: "页脚列",
            frozenLineColor: "颜色",
            freezePane: "定格",
            unfreeze: "解除定格"
        },
        gridLine: {
            title: "网格线",
            showVertical: "垂直可见",
            showHorizontal: "水平可见",
            color: "颜色"
        },
        header: {
            title: "头部",
            showRowHeader: "行标题可见",
            showColumnHeader: "列标题可见"
        },
        selection: {
            title: "选择",
            borderColor: "边框颜色",
            backColor: "背景色",
            hide: "隐藏选择",
            policy: {
                title: "Policy",
                values: {
                    single: "Single",
                    range: "Range",
                    multiRange: "MultiRange"
                }
            },
            unit: {
                title: "Unit",
                values: {
                    cell: "Cell",
                    row: "Row",
                    column: "Column"
                }
            }
        },
        protection: {
            title: "保护",
            protectSheet: "保护工作表",
            selectLockCells: "选择锁定的单元格",
            selectUnlockedCells: "选择未锁定的单元格",
            sort: "排序",
            useAutoFilter: "使用自动筛选程序",
            resizeRows: "调整行大小",
            resizeColumns: "调整列大小",
            editObjects: "编辑对象",
            dragInsertRows: "拖动插入行",
            dragInsertColumns: "拖动插入列",
            insertRows: "插入行",
            insertColumns: "插入列",
            deleteRows: "删除行",
            deleteColumns: "删除列"
        }
    },
    cellTab: {
        style: {
            title: "样式",
            fontFamily: "字体",
            fontSize: "大小",
            foreColor: "前景色",
            backColor: "背景色",
            waterMark: "标签",
            cellPadding: "内部",
            cellLabel: {
                title: "标签选项",
                visibility: "能见度",
                visibilityOption: {
                    auto: "自动",
                    visible: "可见",
                    hidden: "隐藏"
                },
                alignment: "位置调整",
                alignmentOption: {
                    topLeft: "左上角",
                    topCenter: "上中",
                    topRight: "右上角",
                    bottomLeft: "左下角",
                    bottomCenter: "下中",
                    bottomRight: "右下角"
                },
                fontFamily: "字体",
                fontSize: "大小",
                foreColor: "前景色",
                labelMargin: "边缘"
            },
            borders: {
                title: "边框",
                values: {
                    bottom: "Bottom Border",
                    top: "Top Border",
                    left: "Left Border",
                    right: "Right Border",
                    none: "No Border",
                    all: "All Border",
                    outside: "Outside Border",
                    thick: "Thick Box Border",
                    doubleBottom: "Bottom Double Border",
                    thickBottom: "Thick Bottom Border",
                    topBottom: "Top and Bottom Border",
                    topThickBottom: "Top and Thick Bottom Border",
                    topDoubleBottom: "Top and Double Bottom Border"
                }
            }
        },
        border: {
            title: "边框",
            rangeBorderLine: "线",
            rangeBorderColor: "颜色",
            noBorder: "None",
            outsideBorder: "Outside Border",
            insideBorder: "Inside Border",
            allBorder: "All Border",
            leftBorder: "Left Border",
            innerVertical: "Inner Vertical",
            rightBorder: "Right Border",
            topBorder: "Top Border",
            innerHorizontal: "Inner Horizontal",
            bottomBorder: "Bottom Border",
            diagonalUpLine: "Diagonal Up Line",
            diagonalDownLine: "Diagonal Down Line",
        },
        alignment: {
            title: "调整",
            top: "Top",
            middle: "Middle",
            bottom: "Bottom",
            left: "Left",
            center: "Center",
            right: "Right",
            wrapText: "文字缠绕",
            decreaseIndent: "Decrease Indent",
            increaseIndent: "Increase Indent"
        },
        format: {
            title: "格式",
            commonFormat: {
                option: {
                    general: "General",
                    number: "Number",
                    currency: "Currency",
                    accounting: "Accounting",
                    shortDate: "Short Date",
                    longDate: "Long Date",
                    time: "Time",
                    percentage: "Percentage",
                    fraction: "Fraction",
                    scientific: "Scientific",
                    text: "Text"
                }
            },
            percentValue: "0%",
            commaValue: "#,##0.00; (#,##0.00); \"-\"??;@",
            custom: "Custom",
            setButton: "Set"
        },
        merge: {
            title: "合并单元",
            mergeCells: "合并",
            unmergeCells: "取消合并"
        },
        cellType: {
            title: "单元格类型"
        },
        conditionalFormat: {
            title: "条件格式",
            useConditionalFormats: "Conditional Formats"
        },
        protection: {
            title: "保护",
            lock: "锁定",
            sheetIsProtected: "工作表受保护",
            sheetIsUnprotected: "工作表取消保护"
        }
    },
    tableTab: {
        tableStyle: {
            title: "表格样式",
            light: {
                light1: "light1",
                light2: "light2",
                light3: "light3",
                light15: "light15"
            },
            medium: {
                medium1: "medium1",
                medium2: "medium2",
                medium3: "medium3",
                medium7: "medium7"
            },
            dark: {
                dark1: "dark1",
                dark2: "dark2",
                dark3: "dark3",
                dark7: "dark7"
            }
        },
        general: {
            title: "表格",
            tableName: "名称"
        },
        options: {
            title: "选项",
            filterButton: "过滤按钮",
            headerRow: "标题行",
            totalRow: "总计行",
            bandedRows: "变色行",
            bandedColumns: "变色列",
            firstColumn: "第一列",
            lastColumn: "最后一列"
        }
    },
    dataTab: {
        sort: {
            title: "Sort & Filter",
            asc: "Sort A-Z",
            desc: "Sort Z-A",
            filter: "Filter"
        },
        group: {
            title: "Group",
            group: "Group",
            ungroup: "Ungroup",
            showDetail: "Show Detail",
            hideDetail: "Hide Detail",
            showRowOutline: "Show Row Outline",
            showColumnOutline: "Show Column Outline"
        },
        dataValidation: {
            title: "Data Validation",
            setButton: "Set",
            clearAllButton: "Clear All",
            circleInvalidData: "Circle Invalid Data",
            setting: {
                title: "Setting",
                values: {
                    validatorType: {
                        title: "Validator Type",
                        option: {
                            anyValue: "Any Value",
                            number: "Number",
                            list: "List",
                            formulaList: "FormulaList",
                            date: "Date",
                            textLength: "Text Length",
                            custom: "Custom"
                        }
                    },
                    ignoreBlank: "IgnoreBlank",
                    validatorComparisonOperator: {
                        title: "Operator",
                        option: {
                            between: "Between",
                            notBetween: "NotBetween",
                            equalTo: "EqualTo",
                            notEqualTo: "NotEqualTo",
                            greaterThan: "GreaterThan",
                            lessThan: "LessThan",
                            greaterThanOrEqualTo: "GreaterThanOrEqualTo",
                            lessThanOrEqualTo: "LessThanOrEqualTo"
                        }
                    },
                    number: {
                        minimum: "Minimum",
                        maximum: "Maximum",
                        value: "Value",
                        isInteger: "Is Integer"
                    },
                    source: "Source",
                    date: {
                        startDate: "Start Date",
                        endDate: "End Date",
                        value: "Value",
                        isTime: "Is Time"
                    },
                    formula: "Formula"
                }
            },
            inputMessage: {
                title: "Input Message",
                values: {
                    showInputMessage: "Show when cell is selected",
                    title: "Title",
                    message: "Message"
                }
            },
            errorAlert: {
                title: "Error Alert",
                values: {
                    showErrorAlert: "Show after invalid data is entered",
                    alertType: {
                        title: "Alert Type",
                        option: {
                            stop: "Stop",
                            warning: "Warning",
                            information: "Information"
                        }
                    },
                    title: "Title",
                    message: "Message"
                }
            }
        }
    },
    commentTab: {
        general: {
            title: "General",
            dynamicSize: "Dynamic Size",
            dynamicMove: "Dynamic Move",
            lockText: "Lock Text",
            showShadow: "Show Shadow"
        },
        font: {
            title: "Font",
            fontFamily: "Font",
            fontSize: "Size",
            fontStyle: {
                title: "Style",
                values: {
                    normal: "normal",
                    italic: "italic",
                    oblique: "oblique",
                    inherit: "inherit"
                }
            },
            fontWeight: {
                title: "Weight",
                values: {
                    normal: "normal",
                    bold: "bold",
                    bolder: "bolder",
                    lighter: "lighter"
                }
            },
            textDecoration: {
                title: "Decoration",
                values: {
                    none: "none",
                    underline: "underline",
                    overline: "overline",
                    linethrough: "linethrough"
                }
            }
        },
        border: {
            title: "Border",
            width: "Width",
            style: {
                title: "Style",
                values: {
                    none: "none",
                    hidden: "hidden",
                    dotted: "dotted",
                    dashed: "dashed",
                    solid: "solid",
                    double: "double",
                    groove: "groove",
                    ridge: "ridge",
                    inset: "inset",
                    outset: "outset"
                }
            },
            color: "Color"
        },
        appearance: {
            title: "Appearance",
            horizontalAlign: {
                title: "Horizontal",
                values: {
                    left: "left",
                    center: "center",
                    right: "right",
                    general: "general"
                }
            },
            displayMode: {
                title: "Display Mode",
                values: {
                    alwaysShown: "AlwaysShown",
                    hoverShown: "HoverShown"
                }
            },
            foreColor: "Forecolor",
            backColor: "Backcolor",
            padding: "Padding",
            zIndex: "Z-Index",
            opacity: "Opacity"
        }
    },
    pictureTab: {
        general: {
            title: "General",
            moveAndSize: "Move and size with cells",
            moveAndNoSize: "Move and don't size with cells",
            noMoveAndSize: "Don't move and size with cells",
            fixedPosition: "Fixed Position"
        },
        border: {
            title: "Border",
            width: "Width",
            radius: "Radius",
            style: {
                title: "Style",
                values: {
                    solid: "solid",
                    dotted: "dotted",
                    dashed: "dashed",
                    double: "double",
                    groove: "groove",
                    ridge: "ridge",
                    inset: "inset",
                    outset: "outset"
                }
            },
            color: "Color"
        },
        appearance: {
            title: "Appearance",
            stretch: {
                title: "Stretch",
                values: {
                    stretch: "Stretch",
                    center: "Center",
                    zoom: "Zoom",
                    none: "None"
                }
            },
            backColor: "Backcolor"
        }
    },
    sparklineExTab: {
        pieSparkline: {
            title: "PieSparkline Setting",
            values: {
                percentage: "Percentage",
                color: "Color ",
                setButton: "Set"
            }
        },
        areaSparkline: {
            title: "AreaSparkline Setting",
            values: {
                line1: "Line 1",
                line2: "Line 2",
                minimumValue: "Minimum Value",
                maximumValue: "Maximum Value",
                points: "Points",
                positiveColor: "Positive Color",
                negativeColor: "Negative Color",
                setButton: "Set"
            }
        },
        boxplotSparkline: {
            title: "BoxPlotSparkline Setting",
            values: {
                points: "Points",
                boxplotClass: "BoxPlotClass",
                scaleStart: "ScaleStart",
                scaleEnd: "ScaleEnd",
                acceptableStart: "AcceptableStart",
                acceptableEnd: "AcceptableEnd",
                colorScheme: "ColorScheme",
                style: "Style",
                showAverage: "Show Average",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        bulletSparkline: {
            title: "BulletSparkline Setting",
            values: {
                measure: "Measure",
                target: "Target",
                maxi: "Maxi",
                forecast: "Forecast",
                good: "Good",
                bad: "Bad",
                tickunit: "Tickunit",
                colorScheme: "ColorScheme",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        cascadeSparkline: {
            title: "CascadeSparkline Setting",
            values: {
                pointsRange: "PointsRange",
                pointIndex: "PointIndex",
                minimum: "Minimum",
                maximum: "Maximum",
                positiveColor: "ColorPositive",
                negativeColor: "ColorNegative",
                labelsRange: "LabelsRange",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        compatibleSparkline: {
            title: "CompatibleSparkline Setting",
            values: {
                data: {
                    title: "Data",
                    dataOrientation: "DataOrientation",
                    dateAxisData: "DateAxisData",
                    dateAxisOrientation: "DateAxisOrientation",
                    displayEmptyCellAs: "DisplayEmptyCellAs",
                    showDataInHiddenRowOrColumn: "Show data in hidden rows and columns"
                },
                show: {
                    title: "Show",
                    showFirst: "Show First",
                    showLast: "Show Last",
                    showHigh: "Show High",
                    showLow: "Show Low",
                    showNegative: "Show Negative",
                    showMarkers: "Show Markers"
                },
                group: {
                    title: "Group",
                    minAxisType: "MinAxisType",
                    maxAxisType: "MaxAxisType",
                    manualMin: "ManualMin",
                    manualMax: "ManualMax",
                    rightToLeft: "RightToLeft",
                    displayXAxis: "Display XAxis"
                },
                style: {
                    title: "Style",
                    negative: "Negative",
                    markers: "Markers",
                    axis: "Axis",
                    series: "Series",
                    highMarker: "High Marker",
                    lowMarker: "Low Marker",
                    firstMarker: "First Marker",
                    lastMarker: "Last Marker",
                    lineWeight: "Line Weight"
                },
                setButton: "Set"
            }
        },
        hbarSparkline: {
            title: "HbarSparkline Setting",
            values: {
                value: "Value",
                colorScheme: "ColorScheme",
                setButton: "Set"
            }
        },
        vbarSparkline: {
            title: "VarSparkline Setting",
            values: {
                value: "Value",
                colorScheme: "ColorScheme",
                setButton: "Set"
            }
        },
        paretoSparkline: {
            title: "ParetoSparkline Setting",
            values: {
                points: "Points",
                pointIndex: "PointIndex",
                colorRange: "ColorRange",
                highlightPosition: "HighlightPosition",
                target: "Target",
                target2: "Target2",
                label: "Label",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        // pieSparkline: {
        //     title: "PieSparkline Setting",
        //     values: {
        //         percentage: "Percentage",
        //         color: "Color",
        //         setButton: "Set"
        //     }
        // },
        scatterSparkline: {
            title: "ScatterSparkline Setting",
            values: {
                points1: "Points1",
                points2: "Points2",
                minX: "MinX",
                maxX: "MaxX",
                minY: "MinY",
                maxY: "MaxY",
                hLine: "HLine",
                vLine: "VLine",
                xMinZone: "XMinZone",
                xMaxZone: "XMaxZone",
                yMinZone: "YMinZone",
                yMaxZone: "YMaxZone",
                color1: "Color1",
                color2: "Color2",
                tags: "Tags",
                drawSymbol: "Draw Symbol",
                drawLines: "Draw Lines",
                dashLine: "Dash Line",
                setButton: "Set"
            }
        },
        spreadSparkline: {
            title: "SpreadSparkline Setting",
            values: {
                points: "Points",
                scaleStart: "ScaleStart",
                scaleEnd: "ScaleEnd",
                style: "Style",
                colorScheme: "ColorScheme",
                showAverage: "Show Average",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        stackedSparkline: {
            title: "StackedSparkline Setting",
            values: {
                points: "Points",
                colorRange: "ColorRange",
                labelRange: "LabelRange",
                maximum: "Maximum",
                targetRed: "TargetRed",
                targetGreen: "TargetGreen",
                targetBlue: "TargetBlue",
                targetYellow: "TargetYellow",
                color: "Color",
                highlightPosition: "HighlightPosition",
                textOrientation: "TextOrientation",
                textSize: "TextSize",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        variSparkline: {
            title: "VariSparkline Setting",
            values: {
                variance: "Variance",
                reference: "Reference",
                mini: "Mini",
                maxi: "Maxi",
                mark: "Mark",
                tickunit: "TickUnit",
                colorPositive: "ColorPositive",
                colorNegative: "ColorNegative",
                legend: "Legend",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        monthSparkline: {
            title: "MonthSparkline Setting"
        },
        yearSparkline: {
            title: "YearSparkline Setting"
        },
        monthYear: {
            data: "Data",
            month: "Month",
            year: "Year",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range",
            setButton: "set"
        },
        orientation: {
            vertical: "Vertical",
            horizontal: "Horizontal"
        },
        axisType: {
            individual: "Individual",
            custom: "Custom"
        },
        emptyCellDisplayType: {
            gaps: "Gaps",
            zero: "Zero",
            connect: "Connect"
        },
        boxplotClass: {
            fiveNS: "5NS",
            sevenNS: "7NS",
            tukey: "Tukey",
            bowley: "Bowley",
            sigma: "Sigma3"
        },
        boxplotStyle: {
            classical: "Classical",
            neo: "Neo"
        },
        paretoLabel: {
            none: "None",
            single: "Single",
            cumulated: "Cumulated"
        },
        spreadStyle: {
            stacked: "Stacked",
            spread: "Spread",
            jitter: "Jitter",
            poles: "Poles",
            stackedDots: "StackedDots",
            stripe: "Stripe"
        },
        qrCodeSparkline: {
            title: "QRCode Setting",
            values: {
                data: "Data",
                color: "Color",
                backgroundColor: "BackgroundColor",
                errorCorrectionLevel: "ErrorCorrectionLevel",
                model: "Model",
                version: "Version",
                mask: "Mask",
                connection: "Connection",
                connectionNo: "ConnectionNo",
                charCode: "CharCode",
                charset: "Charset"
            }
        },
        ean8Sparkline: {
            title: "EAN8 Setting"
        },
        ean13Sparkline: {
            title: "EAN13 Setting",
            values: {
                addOn: "Add Text",
                addOnLabelPosition: "Add Text Position"
            }
        },
        gs1128Sparkline: {
            title: "GS1_128 Setting"
        },
        codabarSparkline: {
            title: "Codabar Setting",
            values: {
                checkDigit: "Check Digit",
                nwRatio: "Wide And Narrow Ratio"
            }
        },
        pdf417Sparkline:{
            title: "PDF417 Setting",
            values: {
                errorCorrectionLevel: "Error Correction Level",
                rows: "Rows",
                columns: "Columns",
                compact: "Compact"
            }
        },
        dataMatrixSparkline:{
            title: "DataMatrix Setting",
            values: {
                eccMode: "Ecc Mode",
                ecc200SymbolSize: "Ecc200 Symbol Size",
                ecc200EndcodingMode: "Ecc200 Endcoding Mode",
                ecc00_140Symbole: "Ecc00_140 Symbole",
                structureAppend: "Structure Append",
                structureNumber: "Structure Number",
                fileIdentifier: "File Identifier"
            }
        },
        code39Sparkline:{
            title: "Code39 Setting",
            values: {
                labelWithStartAndStopCharacter: "Label With Start And Stop Character",
                nwRatio: "Wide And Narrow Ratio",
                checkDigit: "Check Digit",
                fullASCII: "Full ASCII"
            }
        },
        code49Sparkline:{
            title: "Code49 Setting",
            values: {
                grouping: "Grouping",
                groupNo: "Group No"
            }
        },
        code93Sparkline:{
            title: "Code93 Setting",
            values: {
                checkDigit: "Check Digit",
                fullASCII: "Full ASCII"
            }
        },
        code128Sparkline:{
            title: "Code128 Setting",
            values: {
                codeSet: "Code Set"
            }
        },
        commonParams: {
            data: "Data",
            color: "Color",
            backgroundColor: "BackgroundColor",
            showLabel: "Show Label",
            labelPosition: "Label Position",
            fontFamily: "Font Family",
            fontStyle: "Font Style",
            fontWeight: "Font Weight",
            fontTextDecoration: "Font Text Decoration",
            fontTextAlign: "Font Text Align",
            fontSize: "Font Size",
            quietZoneLeft: "Left Quiet Zone Size",
            quietZoneRight: "Right Quiet Zone Size",
            quietZoneTop: "Top Quiet Zone Size",
            quietZoneBottom: "Bottom Quiet Zone Size",
            setButton: "Set"
        },
        errorCorrectionLevel: {
            l: "L",
            m: "M",
            q: "Q",
            h: "H"
        },
        model: {
            one: "1",
            two: "2"
        },
        version: {
            auto: "auto",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30",
            thirtyOne: "31",
            thirtyTwo: "32",
            thirtyThree: "33",
            thirtyFour: "34",
            thirtyFive: "35",
            thirtySix: "36",
            thirtySeven: "37",
            thirtyEight: "38",
            thirtyNine: "39",
            forty: "40"
        },
        mask: {
            auto: "auto",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7"
        },
        connectionNo: {
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15"
        },
        charset: {
            uft8: "UTF-8",
            shiftJS: "Shift-JIS"
        },
        nwRatio: {
            two: "2",
            three: "3"
        },
        codeset: {
            auto: "auto",
            a: "A",
            b: "B",
            c: "C"
        },
        pdfErrorCorrectionLevel: {
            auto: "auto",
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8"
        },
        rows: {
            auto: "auto",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30",
            thirtyOne: "31",
            thirtyTwo: "32",
            thirtyThree: "33",
            thirtyFour: "34",
            thirtyFive: "35",
            thirtySix: "36",
            thirtySeven: "37",
            thirtyEight: "38",
            thirtyNine: "39",
            forty: "40",
            fortyOne: "41",
            fortyTwo: "42",
            fortyThree: "43",
            fortyFour: "44",
            fortyFive: "45",
            fortySix: "46",
            fortySeven: "47",
            fortyEight: "48",
            fortyNine: "49",
            fifty: "50",
            fiftyOne: "51",
            fiftyTwo: "52",
            fiftyThree: "53",
            fiftyFour: "54",
            fiftyFive: "55",
            fiftySix: "56",
            fiftySeven: "57",
            fiftyEight: "58",
            fiftyNine: "59",
            sixty: "60",
            sixtyOne: "61",
            sixtyTwo: "62",
            sixtyThree: "63",
            sixtyFour: "64",
            sixtyFive: "65",
            sixtySix: "66",
            sixtySeven: "67",
            sixtyEight: "68",
            sixtyNine: "69",
            seventy: "70",
            seventyOne: "71",
            seventyTwo: "72",
            seventyThree: "73",
            seventyFour: "74",
            seventyFive: "75",
            seventySix: "76",
            seventySeven: "77",
            seventyEight: "78",
            seventyNine: "79",
            eighty: "80",
            eightyOne: "81",
            eightyTwo: "82",
            eightyThree: "83",
            eightyFour: "84",
            eightyFive: "85",
            eightySix: "86",
            eightySeven: "87",
            eightyEight: "88",
            eightyNine: "89",
            ninety: "90"
        },
        columns: {
            auto: "auto",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30"
        },
        eccMode: {
            ecc000: "ECC000",
            ecc050: "ECC050",
            ecc080: "ECC080",
            ecc100: "ECC100",
            ecc140: "ECC140",
            ecc200: "ECC200"
        },
        structureNumber: {
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15"
        },
        labelPosition: {
            top: "top",
            bottom: "bottom"
        },
        addOnLabelPosition :{
            top: "top",
            bottom: "bottom"
        },
        fontWeight: {
            normal: "normal",
            bold: "bold"
        },
        textDecoration: {
            none: "none",
            underline: "underline",
            overline: "overline",
            linethrough: "line-through"
        }
    },

    chartExTab: {
            fontSize: "Font Size",
            color: "Color",
            lineColor: "Line Color",
            fontFamily: "Font Family",
            chartType: "Chart Type",
            backColor: "Background color",
            values: {
                chartArea: {
                    title: "Chart Area",
                    backColor: "Background color",
                    color: "Color",
                    fontSize: "Font Size",
                    fontFamily: "Font"
                },
                chartTitle: {
                    title: "Chart Title",
                    text: "Text",
                    chartType: "Chart Type",
                    dataRange: "Data Range"
                },
                series: {
                    title: "Series",
                    seriesIndex:'Series',
                    axisGroup: "Axis Group",
                    lineWidth:"Line Width",
                    primary:"Primary",
                    secondary:"Secondary"
                },
                legend: {
                    title: "Legend",
                    position: {
                        title: "Position",
                        values: {
                            left: "Left",
                            right: "Right",
                            top: "Top",
                            bottom: "Bottom"
                        }
                    },
                    showLegend: "Show Legend",
                    backColor: "Background Color",
                    backColorTransparency: "Background Color Transparency",
                    borderColor: "Border Color",
                    borderColorTransparency: "Border Color Transparency",
                    borderWidth: "Border Width"
                },
                dataLabels: {
                    title: "Data Labels",
                    showValue: "Show Value",
                    showSeriesName: "Show Series Name",
                    showCategoryName: "Show Category Name",
                    position: {
                        title: "Position",
                        values: {

                        }
                    },
                    color: "Color"
                },
                axes: {
                    title: "Axes",
                    axisType: {
                        title: "Axis Type",
                        values: {
                            primaryCategory: "PrimaryCategory",
                            primaryValue: "PrimaryValue",
                            secondaryCategory: "SecondaryCategory",
                            secondaryValue: "SecondaryValue"
                        }
                    },
                    aixsTitle: "Title",
                    titleColor: "Title Color",
                    titleFontSize: "Title Size",
                    titleFontFamily: "Title Font",
                    showMajorGridline: "Show Major Gridline",
                    showMinorGridline: "Show Minor Gridline",
                    showAxis: "Show Axis",
                    lineColor: "Line Color",
                    lineWidth: "Line Width",
                    TickPosition: {
                        majorTitle: "Major Tick Position",
                        minorTitle: "Minor Tick Position",
                        values: {
                            cross: "Cross",
                            inside: "Inside",
                            none: "None",
                            outside: "Outside"
                        }
                    },
                    majorUnit: "Major Unit",
                    minorUnit: "Minor Unit",
                    majorGridlineWidth: "Major Gridline Width",
                    minorGridlineWidth: "Minor Gridline Width",
                    majorGridlineColor: "Major Gridline Color",
                    minorGridlineColor: "Minor Gridline Color",
                    tickLabelPosition: {
                        title: "Tick Label Position",
                        values: {
                            none: "None",
                            nextToAxis: "NextToAxis"
                        }
                    }

                },
                options: {
                    title: "Options",
                    useChartAnimation: "Use Animation"
                },
                dataPoint: {
                    title: "Data Points",
                    dataPointIndex: "Data Point",
                    pointColor: "Point color",
                    pointTransparency: "Point Transparency"
                }

            },
        setButton: "Set",
        combo: {
            title: "ClusteredColumn-LineChart Setting",
            value: {}
        }
    },

    shapeExTab: {
        base: {
            title: "BaseShape Setting",
            values: {
                allowMove:"Allow Move",
                allowResize: "Allow Resize",
                canPrint: "Can Print",
                dynamicMove: "Dynamic Move",
                dynamicSize: "Dynamic Size",
                width: "Width",
                height: "Height",
                isLocked: "Is Locked",
                isSelected: "Is Selected",
                isVisible: "Is Visible",
                name: "Name"
            }
        },
        shape: {
            title: "Shape Setting",
            values: {
                color: "Color",
                backgroundColor: "Background Color",
                border: "Border Style",
                borderWidth: "Border Width",
                borderColor: "Border Color",
                capType: "Cap Style",
                joinType: "Join Type",
                fontWeight: "Font Weight",
                fontSize: "Font Size",
                fontFamily: "Font Family",
                hAlign: "Horizontal Align ",
                vAlign: "Vertical Align",
                text: "Text",
                rotate: "Rotate",
                align: "Text Align"
            }
        },
        group:{
            title: "GroupShape Setting",
            values: {
                group: "Group",
                unGroup: "UnGroup"
            }
        },
        connector:{
            title: "ConnectorShape Setting",
            values: {
                type: "Type",
                beginArrowStyle: "Begin Arrow Style",
                beginArrowLength: "Begin Arrow Height",
                beginArrowWidth: "Begin Arrow Width",
                endArrowStyle: "End Arrow Style",
                endArrowLength: "End Arrow Height",
                endArrowWidth: "End Arrow Width",
                startConnector: "Start Connector",
                endConnector: "End Connector"
            }
        },
        connectorType:{
            elbow: "Elbow",
            straight: "Straight"
        },
        hAlign:{
            center: "Align text to the center",
            left: "Align text to the left",
            right: "Align text to the right"
        },
        vAlign: {
            center: "Align text to the center",
            bottom: "Align text to the bottom",
            top: "Align text to the top"
        },
        capType: {
            flat: "flat",
            square: "square",
            round: "round"
        },
        joinType: {
            round: "round",
            miter: "miter",
            bevel: "bevel"
        },
        arrowHeadLength: {
            short: "Short",
            medium: "Medium",
            long: "Long"
        },
        arrowHeadWidth: {
            narrow: "Narrow",
            medium: "Medium",
            wide: "Wide"
        },
        setButton: "Set",
    },
    slicerTab: {
        slicerStyle: {
            title: "Slicer Style",
            light: {
                light1: "light1",
                light2: "light2",
                light3: "light3",
                light5: "light5",
                light6: "light6"
            },
            dark: {
                dark1: "dark1",
                dark2: "dark2",
                dark3: "dark3",
                dark5: "dark5",
                dark6: "dark6"
            }
        },
        general: {
            title: "General",
            name: "Name",
            captionName: "Caption Name",
            itemSorting: {
                title: "Item Sorting",
                option: {
                    none: "None",
                    ascending: "Ascending",
                    descending: "Descending"
                }
            },
            displayHeader: "Display Header"
        },
        layout: {
            title: "Layout",
            columnNumber: "Column Number",
            buttonHeight: "Button Height",
            buttonWidth: "Button Width"
        },
        property: {
            title: "Property",
            moveAndSize: "Move and size with cells",
            moveAndNoSize: "Move and don't size with cells",
            noMoveAndSize: "Don't move and size with cells",
            locked: "Locked"
        }
    },
    colorPicker: {
        themeColors: "Theme Colors",
        standardColors: "Standard Colors",
        noFills: "No Fills",
        transparency: "Transparency"
    },
    conditionalFormat: {
        setButton: "Set",
        ruleTypes: {
            title: "类型",
            highlightCells: {
                title: "突出显示单元格规则",
                values: {
                    cellValue: "Cell Value",
                    specificText: "Specific Text",
                    dateOccurring: "Date Occurring",
                    unique: "Unique",
                    duplicate: "Duplicate"
                }
            },
            topBottom: {
                title: "上/下规则",
                values: {
                    top10: "Top10",
                    average: "Average"
                }
            },
            dataBars: {
                title: "数据条",
                labels: {
                    minimum: "Minimum",
                    maximum: "Maximum",
                    type: "Type",
                    value: "Value",
                    appearance: "Appearance",
                    showBarOnly: "Show Bar Only",
                    useGradient: "Use Gradien",
                    showBorder: "Show Border",
                    barDirection: "Bar Direction",
                    negativeFillColor: "Negative Color",
                    negativeBorderColor: "Negative Border",
                    axis: "Axis",
                    axisPosition: "Position",
                    axisColor: "Color"
                },
                valueTypes: {
                    number: "Number",
                    lowestValue: "LowestValue",
                    highestValue: "HighestValue",
                    percent: "Percent",
                    percentile: "Percentile",
                    automin: "Automin",
                    automax: "Automax",
                    formula: "Formula"
                },
                directions: {
                    leftToRight: "Left-to-Right",
                    rightToLeft: "Right-to-Left"
                },
                axisPositions: {
                    automatic: "Automatic",
                    cellMidPoint: "CellMidPoint",
                    none: "None"
                }
            },
            colorScales: {
                title: "色标",
                labels: {
                    minimum: "Minimum",
                    midpoint: "Midpoint",
                    maximum: "Maximum",
                    type: "Type",
                    value: "Value",
                    color: "Color"
                },
                values: {
                    twoColors: "2-Color Scale",
                    threeColors: "3-Color Scale"
                },
                valueTypes: {
                    number: "Number",
                    lowestValue: "LowestValue",
                    highestValue: "HighestValue",
                    percent: "Percent",
                    percentile: "Percentile",
                    formula: "Formula"
                }
            },
            iconSets: {
                title: "图标集",
                labels: {
                    style: "Style",
                    showIconOnly: "Show Icon Only",
                    reverseIconOrder: "Reverse Icon Order",

                },
                types: {
                    threeArrowsColored: "ThreeArrowsColored",
                    threeArrowsGray: "ThreeArrowsGray",
                    threeTriangles: "ThreeTriangles",
                    threeStars: "ThreeStars",
                    threeFlags: "ThreeFlags",
                    threeTrafficLightsUnrimmed: "ThreeTrafficLightsUnrimmed",
                    threeTrafficLightsRimmed: "ThreeTrafficLightsRimmed",
                    threeSigns: "ThreeSigns",
                    threeSymbolsCircled: "ThreeSymbolsCircled",
                    threeSymbolsUncircled: "ThreeSymbolsUncircled",
                    fourArrowsColored: "FourArrowsColored",
                    fourArrowsGray: "FourArrowsGray",
                    fourRedToBlack: "FourRedToBlack",
                    fourRatings: "FourRatings",
                    fourTrafficLights: "FourTrafficLights",
                    fiveArrowsColored: "FiveArrowsColored",
                    fiveArrowsGray: "FiveArrowsGray",
                    fiveRatings: "FiveRatings",
                    fiveQuarters: "FiveQuarters",
                    fiveBoxes: "FiveBoxes"
                },
                valueTypes: {
                    number: "Number",
                    percent: "Percent",
                    percentile: "Percentile",
                    formula: "Formula"
                }
            },
            removeConditionalFormat: {
                title: "无"
            }
        },
        operators: {
            cellValue: {
                types: {
                    equalsTo: "EqualsTo",
                    notEqualsTo: "NotEqualsTo",
                    greaterThan: "GreaterThan",
                    greaterThanOrEqualsTo: "GreaterThanOrEqualsTo",
                    lessThan: "LessThan",
                    lessThanOrEqualsTo: "LessThanOrEqualsTo",
                    between: "Between",
                    notBetween: "NotBetween"
                }
            },
            specificText: {
                types: {
                    contains: "Contains",
                    doesNotContain: "DoesNotContain",
                    beginsWith: "BeginsWith",
                    endsWith: "EndsWith"
                }
            },
            dateOccurring: {
                types: {
                    today: "Today",
                    yesterday: "Yesterday",
                    tomorrow: "Tomorrow",
                    last7Days: "Last7Days",
                    thisMonth: "ThisMonth",
                    lastMonth: "LastMonth",
                    nextMonth: "NextMonth",
                    thisWeek: "ThisWeek",
                    lastWeek: "LastWeek",
                    nextWeek: "NextWeek"
                }
            },
            top10: {
                types: {
                    top: "Top",
                    bottom: "Bottom"
                }
            },
            average: {
                types: {
                    above: "Above",
                    below: "Below",
                    equalOrAbove: "EqualOrAbove",
                    equalOrBelow: "EqualOrBelow",
                    above1StdDev: "Above1StdDev",
                    below1StdDev: "Below1StdDev",
                    above2StdDev: "Above2StdDev",
                    below2StdDev: "Below2StdDev",
                    above3StdDev: "Above3StdDev",
                    below3StdDev: "Below3StdDev"
                }
            }
        },
        texts: {
            cells: "Format only cells with:",
            rankIn: "Format values that rank in the:",
            inRange: "values in the selected range.",
            values: "Format values that are:",
            average: "the average for selected range.",
            allValuesBased: "Format all cells based on their values:",
            all: "Format all:",
            and: "and",
            formatStyle: "use style",
            showIconWithRules: "Display each icon according to these rules:"
        },
        formatSetting: {
            formatUseBackColor: "BackColor",
            formatUseForeColor: "ForeColor",
            formatUseBorder: "Border"
        }
    },
    cellTypes: {
        title: "单元格类型",
        buttonCellType: {
            title: "按钮单元格类型",
            values: {
                marginTop: "Margin-Top",
                marginRight: "Margin-Right",
                marginBottom: "Margin-Bottom",
                marginLeft: "Margin-Left",
                text: "Text",
                backColor: "BackColor"
            }
        },
        checkBoxCellType: {
            title: "复选框单元格类型",
            values: {
                caption: "Caption",
                textTrue: "TextTrue",
                textIndeterminate: "TextIndeterminate",
                textFalse: "TextFalse",
                textAlign: {
                    title: "TextAlign",
                    values: {
                        top: "Top",
                        bottom: "Bottom",
                        left: "Left",
                        right: "Right"
                    }
                },
                isThreeState: "IsThreeState"
            }
        },
        comboBoxCellType: {
            title: "组合框单元格类型",
            values: {
                editorValueType: {
                    title: "EditorValueType",
                    values: {
                        text: "Text",
                        index: "Index",
                        value: "Value"
                    }
                },
                itemsText: "Items Text",
                itemsValue: "Items Value"
            }
        },
        hyperlinkCellType: {
            title: "超链接单元格类型",
            values: {
                linkColor: "LinkColor",
                visitedLinkColor: "VisitedLinkColor",
                text: "Text",
                linkToolTip: "LinkToolTip"
            }
        },
        clearCellType: {
            title: "无"
        },
        setButton: "Set"
    },
    sparklineDialog: {
        title: "SparklineEx Setting",
        sparklineExType: {
            title: "Type",
            values: {
                line: "Line",
                column: "Column",
                winLoss: "Win/Loss",
                pie: "Pie",
                area: "Area",
                scatter: "Scatter",
                spread: "Spread",
                stacked: "Stacked",
                bullet: "Bullet",
                hbar: "Hbar",
                vbar: "Vbar",
                variance: "Variance",
                boxplot: "BoxPlot",
                cascade: "Cascade",
                pareto: "Pareto",
                month: "Month",
                year: "Year",
                barCode: "BarCode"
            },
            barCodeList:{
                qrCode:"QRcode",
                dataMatrix:"DataMatrix",
                pdf417:"PDF417",
                ean13:"EAN13",
                ean8:"EAN8",
                codaBar:"CodaBar",
                code39:"Code39",
                code93:"Code93",
                code128:"Code128",
                code49:"Code49",
                GS1128:"GS1_128"
            }
        },
        lineSparkline: {
            dataRange: "Data Range",
            locationRange: "Location Range",
            dataRangeError: "Data range is invalid!",
            singleDataRange: "Data range should be in a single row or column.",
            locationRangeError: "Location range is invalid!"
        },
        bulletSparkline: {
            measure: "Measure",
            target: "Target",
            maxi: "Maxi",
            forecast: "Forecast",
            good: "Good",
            bad: "Bad",
            tickunit: "Tickunit",
            colorScheme: "ColorScheme",
            vertical: "Vertical"
        },
        hbarSparkline: {
            value: "Value",
            colorScheme: "ColorScheme"
        },
        varianceSparkline: {
            variance: "Variance",
            reference: "Reference",
            mini: "Mini",
            maxi: "Maxi",
            mark: "Mark",
            tickunit: "TickUnit",
            colorPositive: "ColorPositive",
            colorNegative: "ColorNegative",
            legend: "Legend",
            vertical: "Vertical"
        },
        monthSparkline: {
            year: "Year",
            month: "Month",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range"
        },
        yearSparkline: {
            year: "Year",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range"
        },
        ean8:{
            color: "Color",
            backgroundColor: "Background Color",
        },
        gs1128:{
            showLabel: "Show Label",
            labelPosition: "Label Position"
        },
        ean13:{
            addOn: "Add Text Of QRCode",
            addOnLabelPosition: "Add On Label Position"
        },
        codaBar:{
            checkDigit: "Check Digit",
            nwRatio: "Wide And Narrow Ratio"
        },
        code39:{
            labelWithStartAndStopCharacter: "Label With Start And Stop Character",
            nwRatio: "Wide And Narrow Ratio",
        },
        code49:{
            grouping: "Grouping",
            groupNo: "Group No"
        },
        code93:{
            checkDigit: "Check Digit",
            fullASCII: "Full ASCII"
        },
        code128:{
            codeSet: "Code Set"
        },
        pdf417:{
            errorCorrectionLevel: "Error Correction Level",
            rows: "Rows",
            columns: "Columns",
            compact: "Compact"
        },
        dataMatrix:{
            eccMode: "Ecc Mode",
            ecc200SymbolSize: "Ecc200 Symbol Size",
            ecc200EncodingMode: "Ecc200 Encoding Mode",
            ecc00_140Symbol: "Ecc00_140 Symbol",
            structureAppend: "Structure Append",
            structureNumber: "Structure Number",
            fileIdentifier: "File Identifier"
        },
        qrCode:{
            errorCorrectionLevel: "Error Correction Level",
            model: "Model",
            version: "Version",
            mask: "Mask",
            connection: "Connection",
            connectionNo: "ConnectionNo",
            charCode: "Char Code",
            charset: "Charset"
        }
    },
    chartDialog: {
        title: "chartEx Setting",
        chartExType: {
            title: "Type",
            values: {
                columnClustered: "Clustered Column",
                columnStacked: "Stacked Column",
                columnStacked100: "100% Stacked Column",
                line: "Line",
                lineStacked: "Stacked Line",
                lineStacked100: "100% Stacked Line",
                lineMarkers: "Line With Markers",
                lineMarkersStacked: "Stacked Line With Markers",
                lineMarkersStacked100: "100% Stacked Line With Markers",
                pie: "Pie",
                doughnut: "Doughnut",
                barClustered: "Clustered Bar",
                barStacked: "Stacked Bar",
                barStacked100: "100% Stacked Bar",
                area: "Area",
                areaStacked: "Stacked Area",
                areaStacked100: "100% Stacked Area",
                xyScatter: "Scatter",
                xyScatterSmooth: "Scatter with Smooth Lines and Markers",
                xyScatterSmoothNoMarkers: "Scatter with Smooth Lines",
                xyScatterLines: "Scatter with Straight Lines and Markers",
                xyScatterLinesNoMarkers: "Scatter with Straight Lines",
                bubble: "Bubble",
                stockHLC: "High-Low-Close",
                stockOHLC: "Open-High-Low-Close",
                stockVHLC: "Volumn-High-Low-Close-Stock",
                stockVOHLC: "Volumn-Open-High-Low-Close-Stock",
                combo: "Clustered Column-Line",
                radar: "Radar",
                radarMarkers: "Radar Markers",
                radarFilled: "Radar Filled",
                sunburst: "Sunburst",
                treemap: "Treemap"
            }
        }
    },
    shapeDialog: {
        title: "shapeEx Setting",
        shapeExType: {
            title: "Type",
            values: {
                connector: 'Line',
                blockArrows: 'Block Arrows',
                flowchart: 'Flowchart',
                callouts: 'Callouts',
                rectangles: 'Rectangles',
                equationShapes:'Equation Shapes',
                basicShapes: 'Basic Shapes',
                starsAndBanners: 'Stars And Banners'
            }
        }
    },
    slicerDialog: {
        insertSlicer: "插入切片"
    },
    richTextDialog: {
        editRichText: "Edit Rich Text",
        title:"Rich Text"
    },
    passwordDialog: {
        title: "Password",
        error: "Incorrect Password!"
    },
    tooltips: {
        style: {
            fontBold: "Mark text bold.",
            fontItalic: "Mark text italic",
            fontUnderline: "Underline text.",
            fontOverline: "Overline text.",
            fontLinethrough: "Strikethrough text.",
            fontDoubleUnderline: "Double Underline text"
        },
        alignment: {
            leftAlign: "Align text to the left.",
            centerAlign: "Center text.",
            rightAlign: "Align text to the right.",
            topAlign: "Align text to the top.",
            middleAlign: "Align text to the middle.",
            bottomAlign: "Align text to the bottom.",
            decreaseIndent: "Decrease the indent level.",
            increaseIndent: "Increase the indent level.",
            verticalText: "Vertical text"
        },
        border: {
            outsideBorder: "Outside Border",
            insideBorder: "Inside Border",
            allBorder: "All Border",
            leftBorder: "Left Border",
            innerVertical: "Inner Vertical",
            rightBorder: "Right Border",
            topBorder: "Top Border",
            innerHorizontal: "Inner Horizontal",
            bottomBorder: "Bottom Border",
            diagonalUpLine: "Diagonal Up Line",
            diagonalDownLine: "Diagonal Down Line",
        },
        format: {
            percentStyle: "Percent Style",
            commaStyle: "Comma Style",
            increaseDecimal: "Increase Decimal",
            decreaseDecimal: "Decrease Decimal"
        }
    },
    defaultTexts: {
        buttonText: "Button",
        checkCaption: "Check",
        comboText: "United States,China,Japan",
        comboValue: "US,CN,JP",
        hyperlinkText: "LinkText",
        hyperlinkToolTip: "Hyperlink Tooltip"
    },
    messages: {
        invalidImportFile: "Invalid file, import failed.",
        duplicatedSheetName: "Duplicated sheet name.",
        duplicatedTableName: "Duplicated table name.",
        rowColumnRangeRequired: "Please select a range of row or column.",
        imageFileRequired: "The file must be image!",
        duplicatedSlicerName: "Duplicated slicer name.",
        invalidSlicerName: "Slicer name is not valid."
    },
    dialog: {
        ok: "OK",
        cancel: "Cancel"
    },
    chartDataLabels:{
        center:'Center',
        insideEnd:'Inside End',
        outsideEnd:'Outside End',
        bestFit:'Best Fit',
        above:'Above',
        below:'Below',
    }
};

